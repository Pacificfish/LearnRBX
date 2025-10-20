import { parse } from 'luaparse';
import { Test, CodeTaskStep } from '@/types/curriculum';

export class ChallengeEngine {
  private worker: Worker | null = null;

  constructor() {
    // Initialize WebWorker for sandboxed Lua execution
    this.initializeWorker();
  }

  private initializeWorker() {
    const workerCode = `
      // Fengari worker code will be added here
      self.onmessage = function(e) {
        const { code, tests } = e.data;
        
        try {
          // Execute Lua code with Fengari
          // This is a placeholder - actual implementation will use Fengari
          const output = "Hello from Lua!";
          const result = { success: true, output, error: null };
          self.postMessage(result);
        } catch (error) {
          self.postMessage({ success: false, output: '', error: error.message });
        }
      };
    `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    this.worker = new Worker(URL.createObjectURL(blob));
  }

  async runTests(code: string, tests: Test[]): Promise<TestResult[]> {
    return new Promise((resolve) => {
      if (!this.worker) {
        resolve(tests.map(test => ({ ...test, passed: false, error: 'Worker not initialized' })));
        return;
      }

      const timeout = setTimeout(() => {
        this.worker?.terminate();
        this.initializeWorker();
        resolve(tests.map(test => ({ ...test, passed: false, error: 'Timeout' })));
      }, 2000);

      this.worker.onmessage = (e) => {
        clearTimeout(timeout);
        const { success, output, error } = e.data;
        
        const results = tests.map(test => {
          if (!success) {
            return { ...test, passed: false, error };
          }

          switch (test.type) {
            case 'runtime':
              return this.runRuntimeTest(test, output);
            case 'static':
              return this.runStaticTest(test, code);
            case 'regex':
              return this.runRegexTest(test, code);
            default:
              return { ...test, passed: false, error: 'Unknown test type' };
          }
        });

        resolve(results);
      };

      this.worker.postMessage({ code, tests });
    });
  }

  private runRuntimeTest(test: Test, output: string): TestResult {
    switch (test.assert) {
      case 'output_contains':
        return { ...test, passed: output.includes(test.value), error: null };
      case 'output_equals':
        return { ...test, passed: output.trim() === test.value, error: null };
      case 'not_error':
        return { ...test, passed: !output.includes('error'), error: null };
      default:
        return { ...test, passed: false, error: 'Unknown runtime assertion' };
    }
  }

  private runStaticTest(test: Test, code: string): TestResult {
    try {
      const ast = parse(code);
      
      switch (test.assert) {
        case 'identifier_exists':
          return { ...test, passed: this.checkIdentifierExists(ast, test.value), error: null };
        case 'function_exists':
          return { ...test, passed: this.checkFunctionExists(ast, test.value), error: null };
        case 'literal_includes':
          return { ...test, passed: code.includes(test.value), error: null };
        default:
          return { ...test, passed: false, error: 'Unknown static assertion' };
      }
    } catch (error) {
      return { ...test, passed: false, error: 'Parse error' };
    }
  }

  private runRegexTest(test: Test, code: string): TestResult {
    try {
      const regex = new RegExp(test.value);
      return { ...test, passed: regex.test(code), error: null };
    } catch (error) {
      return { ...test, passed: false, error: 'Invalid regex' };
    }
  }

  private checkIdentifierExists(ast: any, identifier: string): boolean {
    // Recursively check if identifier exists in AST
    const checkNode = (node: any): boolean => {
      if (!node) return false;
      
      if (node.type === 'Identifier' && node.name === identifier) {
        return true;
      }
      
      // Check all properties of the node
      for (const key in node) {
        if (typeof node[key] === 'object') {
          if (Array.isArray(node[key])) {
            for (const item of node[key]) {
              if (checkNode(item)) return true;
            }
          } else if (checkNode(node[key])) {
            return true;
          }
        }
      }
      
      return false;
    };
    
    return checkNode(ast);
  }

  private checkFunctionExists(ast: any, functionName: string): boolean {
    // Similar to checkIdentifierExists but specifically for functions
    const checkNode = (node: any): boolean => {
      if (!node) return false;
      
      if (node.type === 'FunctionDeclaration' && node.identifier?.name === functionName) {
        return true;
      }
      
      if (node.type === 'CallExpression' && node.base?.name === functionName) {
        return true;
      }
      
      for (const key in node) {
        if (typeof node[key] === 'object') {
          if (Array.isArray(node[key])) {
            for (const item of node[key]) {
              if (checkNode(item)) return true;
            }
          } else if (checkNode(node[key])) {
            return true;
          }
        }
      }
      
      return false;
    };
    
    return checkNode(ast);
  }

  destroy() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}

export interface TestResult extends Test {
  passed: boolean;
  error: string | null;
}

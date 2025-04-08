import * as path from 'path';
import * as os from 'os';
import { runTests } from 'vscode-test';

async function main() {
  try {
    const extensionDevelopmentPath = path.resolve(__dirname, '../../');
    const extensionTestsPath = path.resolve(__dirname, './testsRunner');
    
    const vscodeVersion = 'stable';

    // Détection dynamique de la plateforme
    let platform;
    const type = os.type();
    const arch = os.arch();

    if (type === 'Darwin') {
      platform = arch === 'arm64' ? 'darwin-arm64' : 'darwin';
    } else if (type === 'Windows_NT') {
      platform = 'win32-x64-archive';
    } else if (type === 'Linux') {
      platform = arch === 'arm64' ? 'linux-arm64' : 'linux-x64';
    } else {
      throw new Error(`Unsupported OS: ${type}`);
    }

    await runTests({ 
      version: vscodeVersion, 
      platform, 
      extensionDevelopmentPath, 
      extensionTestsPath,
      launchArgs: ['--disable-extensions'] 
    });
  } catch (err) {
    console.error('Failed to run tests', err);
    process.exit(1);
  }
}

main();

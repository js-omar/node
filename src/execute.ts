import { promisify } from 'node:util';
import { exec } from 'node:child_process';

/**
 * It executes a command or an array of commands,
 * and throws an error if any of the commands fail
 * @param {string | string[]} command - The command to execute.
 */
async function execute(command: string | string[]): Promise<void> {
  const commands = typeof command === 'string' ? [command] : command;

  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];

    const { stderr } = await promisify(exec)(cmd, {
      shell: 'powershell.exe',
    });

    if (stderr && !cmd.includes('git commit')) {
      // eslint-disable-next-line no-console
      console.log('\n\n=============== START: STDERR ===============');
      throw new Error(stderr);
    }
  }
}

export { execute };

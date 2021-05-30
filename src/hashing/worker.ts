import { parentPort } from 'worker_threads';
import { createHash } from 'crypto';
import { Block } from 'src/blockchain/block';
import { WorkerCommand } from './worker-command';

parentPort.on('message', async (message: WorkerCommand<any>) => {
  switch (message.name) {
    case 'abord':
      process.env.COMMAND_BREAK = message.data;
      break;
    case 'find-nonce':
      message.data = await findNonce(message.data, message.id);
      if (message.data !== -1) {
        parentPort.postMessage(message);
      }
      process.env.COMMAND_BREAK = null;
      break;
    default:
      console.warn('Unknown worker command');
      break;
  }
});

const findNonce = async (block: Block, commandId: string) => {
  while (true) {
    const result = await new Promise<number | void>((resolve) => {
      setImmediate(async () => {
        block.nonce = Math.random() * 1000;
        if (process.env.COMMAND_BREAK === commandId) resolve(-1);
        else if (isProofValid(block)) resolve(block.nonce);
        else resolve();
      });
    });

    if (result) return result;
  }
};

const isProofValid = (block: Block) => {
  const hashFunction = createHash('sha256');
  const blockString = `${block.previousBlockHash}-${JSON.stringify(block.transactions)}-${block.nonce}-${
    block.timestamp
  }`;
  hashFunction.update(blockString);
  const hexString = hashFunction.digest('hex');
  return hexString.startsWith('00000');
};

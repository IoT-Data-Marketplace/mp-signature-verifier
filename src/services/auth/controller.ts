import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';
import { Request, Response } from 'express';

export const create = (req: Request, res: Response) => {
  const { nonce, signature, publicAddress } = req.body;
  if (!nonce || !signature || !publicAddress)
    return res
      .status(400)
      .send({ error: 'Request should have signature and publicAddress' });

    const msg = nonce;

    // We now are in possession of msg, publicAddress and signature. We
    // will use a helper from eth-sig-util to extract the address from the signature
    const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
    const address = recoverPersonalSignature({
        data: msgBufferHex,
        sig: signature,
    });

    // The signature verification is successful if the address found with
    // sigUtil.recoverPersonalSignature matches the initial publicAddress
    if (address.toLowerCase() === publicAddress.toLowerCase()) {
        res.status(200).send({ result: 'true' });
        return true;
    } else {
        res.status(401).send({ error: 'Signature verification failed' });
        return null;
    }
};

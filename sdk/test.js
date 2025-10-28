import { VerifyMyWallet } from "./index.js";

const run = async () => {
  const vmw = new VerifyMyWallet();
  const result = await vmw.verify("0x123...", "metamask");
  console.log(result);
};

run();

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("CertiModule", (m) => {
  const certi = m.contract("Cert");

  return { certi };
});

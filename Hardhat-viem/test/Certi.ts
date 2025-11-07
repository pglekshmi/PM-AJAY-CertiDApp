import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { network } from "hardhat";
import { getCreateAddress } from "viem";

describe('Cert', async function () {
    const { viem,networkHelpers} = await network.connect()
   

    async function deployCertFixture() {
        const [admin, other] =  await viem.getWalletClients();
        const Cert = await viem.deployContract('Cert')
        
        return { admin, Cert, other };
    }


    it("Should be deployed by admin", async function () {
        const { admin, Cert } = await networkHelpers.loadFixture(deployCertFixture);
        const contractAddress = getCreateAddress({
            from:admin.account.address,
            nonce:0n
        })

        assert.equal(Cert.address,contractAddress.toLowerCase());

    });

    it("Should be able to add and read certificate",async()=>{
        const {admin,Cert,other} = await networkHelpers.loadFixture(deployCertFixture);
        // await Cert.issue(101,"Anju","EDP","A","01/02/2025");
        const hash = await Cert.write.issue([101n,"Anju","EDP","A","01/02/2025"])
        const Certificates = await Cert.read.Certificates([101n]);
        console.log(Certificates);

        assert.equal(Certificates[0],"Anju");
        assert.equal(Certificates[2],"A")
        })

    it("Reverted when attempted by unauthorized Person",async()=>{
        const {admin,Cert,other} = await networkHelpers.loadFixture(deployCertFixture);
        const contractOther = await viem.getContractAt('Cert',Cert.address,{
            client:{wallet:other},
        })
        await viem.assertions.revertWith(contractOther.write.issue([102n,"Kala","CHF","S","01/09/2025"]),'Access Denied')
        })

})
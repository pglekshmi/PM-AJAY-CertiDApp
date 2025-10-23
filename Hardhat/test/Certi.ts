import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { expect } from "chai";
// import  {ethers} from "hardhat";
// import networkHelpers from "@nomicfoundation/hardhat-network-helpers"


import { network } from "hardhat";

describe('Cert', async function () {
    const { ethers,networkHelpers} = await network.connect()

    async function deployCertFixture() {
        const [admin, other] = await ethers.getSigners();
        // console.log("others",other);

        const cert = await ethers.getContractFactory('Cert');
        const Cert = await cert.deploy();

        return { admin, Cert, other };
    }

    it("Should be deployed by admin", async function () {

        const { admin, Cert, other } = await networkHelpers.loadFixture(deployCertFixture);
        console.log(Cert.deploymentTransaction()?.from);
        console.log(admin.address);


        assert.equal(Cert.deploymentTransaction()?.from.toLowerCase(),admin.address.toLowerCase());

    });

    it("Should be able to add and read certificate",async()=>{
        const {admin,Cert,other} = await networkHelpers.loadFixture(deployCertFixture);
        await Cert.issue(101,"Anju","EDP","A","01/02/2025");
        const Certificates = await Cert.Certificates(101);
        console.log(Certificates);

        assert.equal(Certificates[0],"Anju");
        assert.equal(Certificates[2],"A")
        
    })

    it("Reverted when attempted by unauthorized Person",async()=>{
        const {admin,Cert,other} = await networkHelpers.loadFixture(deployCertFixture);
        await expect(Cert.connect(other).issue(102,"Anna","EDP","S","02/02/2025")).to.be.revertedWith("Access Denied") 
        
    })

})
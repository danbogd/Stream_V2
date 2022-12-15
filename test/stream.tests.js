const { expect } = require("chai")// expect из библиотеки chai
const { ethers } = require("hardhat")// библиотека ethers

/*
expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.lengthOf(3);
expect(beverages).to.have.property('tea').with.lengthOf(3);
*/

describe("MyStream", function () {// 
  let owner // данные переменные доступны для всех тестов
  let sender 
  let recipient 
  let myStream

  let tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    

  beforeEach(async function() {// перед каждым тестом
    [owner, recepient, sender] = await ethers.getSigners()
    const MyStream = await ethers.getContractFactory("MyStream", owner)// MyStream должно совпадать с именем контракта
    myStream = await MyStream.deploy()
    await myStream.deployed()
    //console.log(myStream.address);
    
   
    
  })

    it("should be deployed", async function() {
        expect(myStream.address).to.be.properAddress// проверка корректности адреса см библ waffle https://ethereum-waffle.readthedocs.io/en/latest/
    })

    it("set owner", async function() {
        const contractOwner = await myStream.owner();
        expect(contractOwner).to.eq(owner.address)
        
    })

    // Fee()

    it("Get fee", async function() {
        const r1 = await myStream.fee();
        expect(r1).to.eq(10)
        
    }) 
    
    it("Change fee by  owner", async function() {
        await myStream.changeFee(20);
        const r1 = await myStream.fee();
        expect(r1).to.eq(20)
        
    }) 

    it("Users cannot change fee", async function() {
        await expect(myStream.connect(sender).changeFee(20)).to.be.reverted;
        
    })


    
        
})



describe("create Stream", function () {

    let owner // данные переменные доступны для всех тестов
    let sender 
    let recepient 
    let myStream
    let ts
    let dai
  
    let tokenAddress 
    let deposit = ethers.utils.parseEther("0.05");
    
    async function get(bn){
        return (
             await  ethers.provider.getBlock(bn)).timestamp
        
    }     
  
    beforeEach(async function() {// перед каждым тестом
      [owner, recepient, sender] = await ethers.getSigners()

      const DAI = await ethers.getContractFactory("DAI", owner);
      dai = await DAI.deploy("Dai", "DAI", 18);
      const tx2 = await dai.deployed();
      
      tokenAddress = tx2.address
      await dai.mint(sender.address, deposit)
      await dai.mint(owner.address, deposit)
      const balance = await dai.balanceOf(sender.address)
      //console.log (balance)

      const MyStream = await ethers.getContractFactory("MyStream", owner)// MyStream должно совпадать с именем контракта
      myStream = await MyStream.deploy()
      await myStream.deployed()


      const tx = await myStream.changeFee(10);
      //console.log(tx.blockNumber);
      ts =  await get(tx.blockNumber);
      //console.log("Curent timestamp :",ts);

       
      
    })

    it("createStream() function emit event CreateStream", async function() {

        var startTime = ts + 10;
        var endTime = ts + 70;
       await dai.connect(sender).approve(myStream.address, deposit)
       await expect( myStream.connect(sender).
       createStream(recepient.address, deposit, tokenAddress, startTime, endTime, 0, true, true))
       .to.emit(myStream, "CreateStream").withArgs(1, sender.address, recepient.address, deposit, tokenAddress, startTime, endTime, 0, true, true );
         
    })


    it("createStream() return ID", async function() {

        var startTime = ts + 10;
        var endTime = ts + 70;
       await dai.connect(sender).approve(myStream.address, deposit)
       await dai.approve(myStream.address, deposit)
       await myStream.connect(sender).createStream(recepient.address, deposit, tokenAddress, startTime, endTime, 0, true, true)
      // await myStream.connect(sender).createStream(recepient.address, deposit, tokenAddress, startTime, endTime, 0, true, true)
       var res1 = await myStream.createStream(recepient.address, deposit, tokenAddress, startTime, endTime, 0, true, true)
       var id = await myStream.nextStreamId() - 1
       expect(id).to.eq(2)
       
      
         
    })

})

    
    




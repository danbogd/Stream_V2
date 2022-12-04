const { expect } = require("chai")
const { ethers } = require("hardhat")// библиотека ethers

describe("nick", function () {// 
  let acc1 // данные переменные доступны для всех тестов
  let acc2  
  let nick
    

  beforeEach(async function() {// перед каждым тестом
    [acc1, acc2] = await ethers.getSigners()// получаем аккаунты
    const Nick = await ethers.getContractFactory("nick", acc1)// получаем скомпил версию контракта
    nick = await Nick.deploy()// payments = смарт-контракт с которым работаем
    await nick.deployed()
    //console.log(nick.address);
    await nick.setNick("myNick");// set new nick from acc1
   
    
  })

  it("should be deployed", async function() {
    expect(nick.address).to.be.properAddress// проверка корректности адреса см библ waffle https://ethereum-waffle.readthedocs.io/en/latest/
  })

  it("should be add nick name", async function() {
      const r1 = await nick.addrNick(acc1.address);
    
    expect(r1).to.eq('myNick')
    
  })

  it("should be add nick name from acc2", async function() {
    await nick.connect(acc2).setNick("myNick_ACC2");
    const r2 = await nick.addrNick(acc2.address);
    expect(r2).to.eq('myNick_ACC2')
  })  

 
  it("should be revert when change nick name from not owner", async function() {
    await nick.connect(acc2).setNick("myNick_ACC2");
    await expect(nick.connect(acc1).changeNick("myNick_ACC2","myNick_ACC3")).to.be.reverted;

  })  

  it("should be revert with message", async function() {
    await nick.connect(acc2).setNick("myNick_ACC2");
    await expect(nick.connect(acc1).changeNick("myNick_ACC2","myNick_ACC3")).to.be.revertedWith('Call must come from owner');

  }) 
  
       
  
})


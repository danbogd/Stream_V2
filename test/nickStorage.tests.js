const { expect } = require("chai")
const { ethers } = require("hardhat")// библиотека ethers

describe("nick", function () {// описываем смартконтракт Payments
  let acc1 // данные переменные доступны для всех тестов
  let acc2
  

  beforeEach(async function() {// перед каждым тестом
    [acc1, acc2] = await ethers.getSigners()// получаем аккаунты
    const Payments = await ethers.getContractFactory("nick", acc1)// получаем скомпил версию контракта
    payments = await Payments.deploy()// payments = смарт-контракт с которым работаем
    await payments.deployed()
    console.log(payments.address);
  })

  it("should be deployed", async function() {
    expect(payments.address).to.be.properAddress// проверка корректности адреса см библ waffle https://ethereum-waffle.readthedocs.io/en/latest/
  })

});
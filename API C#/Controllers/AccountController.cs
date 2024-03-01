using Microsoft.AspNetCore.Mvc;
using PaymentAPI.Data;
using PaymentAPI.Models;
using PaymentAPI.Repositories.Interfaces;

namespace PaymentAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;
        private readonly PaymentAPIContext DBContext;
        public AccountController(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }

        [HttpGet("{number}")]
        public async Task<ActionResult<AccountModel>> FindAccount(int number)
        {
            AccountModel account = await _accountRepository.FindAccount(number);
            return Ok(account);
        }

        [HttpGet("pass/{password}")]
        public async Task<ActionResult<AccountModel>> FindByPass(int password, int number)
        {
            AccountModel account = await _accountRepository.FindByPass(password, number);
            return Ok(account);
        }


        [HttpPost]
        public async Task<ActionResult<AccountModel>> GenerateAccount([FromBody]AccountModel accountModel)
        {
            AccountModel account = await _accountRepository.GenerateAccount(accountModel);
            return Ok(accountModel);
        }

        [HttpPut("insert")]
        public async Task<ActionResult<AccountModel>> InsertValue([FromBody] AccountModel accountModel)
        {
            AccountModel account = await _accountRepository.InsertValue(accountModel);

            return Ok(account);
        }

        
        [HttpPut("consume")]
        public async Task<ActionResult<AccountModel>> ConsumeValue([FromBody] AccountModel accountModel)
        {
            AccountModel account = await _accountRepository.ConsumeValue(accountModel);
            
            return Ok(account);
        }

        [HttpPost("GeneratePayment")]
        public async Task<ActionResult<AccountModel>> GeneratePayment([FromBody] AccountModel accountModel)
        {
            AccountModel account = await _accountRepository.GeneratePayment(accountModel);
            return Ok(account);
        }

        [HttpPut("PayPayment")]
        public async Task<ActionResult<AccountModel>> PayPayment([FromBody] AccountModel accountModel)
        {
            AccountModel account = await _accountRepository.PayPayment(accountModel);
            return Ok(account);
        }

        [HttpPut("Transfer")]
        public async Task<ActionResult<AccountModel>> Transfer([FromBody] AccountModel accountModel)
        {
            AccountModel account = await _accountRepository.TransferValue(accountModel);
            return Ok(account);
        }
    }
}
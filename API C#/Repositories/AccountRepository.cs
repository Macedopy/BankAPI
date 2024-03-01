using System.Data;
using System.Data.Common;
using System.IO.Compression;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using PaymentAPI.Data;
using PaymentAPI.Models;
using PaymentAPI.Repositories.Interfaces;

namespace PaymentAPI.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly PaymentAPIContext DBContext;
        public AccountRepository(PaymentAPIContext paymentAPIContext)
        {
            DBContext = paymentAPIContext;
        }

        public async Task<AccountModel> FindAccount(int number)
        {
            return await DBContext.Account.FromSql($"SELECT * FROM Account WHERE Number ={number}").Include(a => a.User).SingleAsync();
        }

        public async Task<AccountModel> GenerateAccount(AccountModel accountModel)
        {
            UserModel lastId = await DBContext.Users.OrderBy(x=>x.Id).LastOrDefaultAsync();
            accountModel.UserId = lastId.Id;
            Random rnd = new Random();
            var number = rnd.Next(1000,9999);
            accountModel.Number = number;
            accountModel.Code = null;
            /// Anexar o accountId com o último Id colocado no banco users
            await DBContext.Account.AddAsync(accountModel);
            await DBContext.SaveChangesAsync();

            return accountModel;
        }

        public async Task<AccountModel> GeneratePayment(AccountModel accountModel)
        {
            AccountModel account = await FindAccount(accountModel.Number);

                Guid guid = Guid.NewGuid();
                guid.ToString();
                var convert = guid.ToString();
                account.Code = convert + $"value:{accountModel.Value}";
                DBContext.Update(account);
                await DBContext.SaveChangesAsync();
            return account;
        }
        

        public async Task<AccountModel> InsertValue(AccountModel accountModel)
        {
            AccountModel account = await FindAccount(accountModel.Number);
                account.Value += accountModel.Value;

                DBContext.Account.Update(account);
                await DBContext.SaveChangesAsync();

                return account;

        }

        public async Task<AccountModel> PayPayment(AccountModel accountModel)
        {
            AccountModel accountSeller = await DBContext.Account.Where(a => a.Code == accountModel.Code).FirstOrDefaultAsync();
            AccountModel accountBuyer = await FindAccount(accountModel.AccountId);
            var transform = accountSeller.Code.ToString();
            var findPayment = transform.Split(':');
            var Payment = findPayment[1];
            int PaymentToInt = int.Parse(Payment);
            accountBuyer.Value -= PaymentToInt;
            accountSeller.Value = accountSeller.Value + PaymentToInt;
            accountSeller.Code = null;

            //aplicar o For para o Update, testa primeiro se funciona
            // DBContext.Account.Update(accountBuyer, accountSeller);
            DBContext.Account.Update(accountBuyer);
            DBContext.Account.Update(accountSeller);
            await DBContext.SaveChangesAsync();
            return accountBuyer;
        }
        

        public async Task<AccountModel> FindByPass(int password, int number )
        {
            UserModel User = await DBContext.Users.FirstOrDefaultAsync(x => x.Password == password);
            AccountModel Account = await DBContext.Account.FirstOrDefaultAsync(x => x.Number == number);

            if (User.Password == password & Account.Number == number)
            {
                return Account;
            }else{throw new Exception($"Account not found with number:{number}, Password: {password}");}
        }

        public async Task<AccountModel> ConsumeValue(AccountModel accountModel)
        {
            AccountModel account = await FindAccount(accountModel.Number);
            account.Value = accountModel.Value;
            DBContext.Account.Update(account);
            await DBContext.SaveChangesAsync();
            return account;
            

        }

        public async Task<AccountModel> TransferValue(AccountModel accountModel)
        {
            AccountModel account = await FindAccount(accountModel.Number);
            AccountModel accountReceive = await DBContext.Account.Where(a => a.Number == accountModel.AccountId).FirstOrDefaultAsync();
            var result = account.Value - accountModel.Value;
            account.Value = result;
            accountReceive.Value = accountReceive.Value + accountModel.Value;
            DBContext.Account.Update(account);
            DBContext.Account.Update(accountReceive);
            await DBContext.SaveChangesAsync();
            return account;

        }
    }
}
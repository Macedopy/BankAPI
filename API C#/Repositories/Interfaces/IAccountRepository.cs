using PaymentAPI.Models;

namespace PaymentAPI.Repositories.Interfaces
{
    public interface IAccountRepository
    {
        Task<AccountModel> ConsumeValue(AccountModel accountModel);
        Task<AccountModel> GenerateAccount(AccountModel accountModel);
        Task<AccountModel> FindAccount(int number);
        Task<AccountModel> FindByPass(int password, int number );
        Task<AccountModel> InsertValue(AccountModel accountModel);
        Task<AccountModel> GeneratePayment(AccountModel accountModel);
        Task<AccountModel> PayPayment(AccountModel accountModel);
        Task<AccountModel> TransferValue(AccountModel accountModel);
    }
}
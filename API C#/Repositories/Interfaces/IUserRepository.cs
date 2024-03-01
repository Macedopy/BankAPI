using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PaymentAPI.Models;

namespace PaymentAPI.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<UserModel> FindById(int id);
        Task<UserModel> AddUser(UserModel user);
        Task<UserModel> Update(UserModel user, int id);
        Task<bool> Delete(int id);

    }
}
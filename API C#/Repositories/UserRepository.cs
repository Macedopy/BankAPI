using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PaymentAPI.Data;
using PaymentAPI.Models;
using PaymentAPI.Repositories.Interfaces;

namespace PaymentAPI.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly PaymentAPIContext DBContext;
        public UserRepository(PaymentAPIContext paymentAPIContext)
        {
            DBContext = paymentAPIContext;
        }
        public async Task<UserModel> AddUser(UserModel user)
        {
            await DBContext.Users.AddAsync(user);
            await DBContext.SaveChangesAsync();

            return user;
        }

        public async Task<bool> Delete(int id)
        {
            UserModel userByid = await FindById(id);
            if(userByid==null)
            {
                throw new Exception("User not found");
            }

            DBContext.Users.Remove(userByid);
            await DBContext.SaveChangesAsync();
            return true;
        }

        public async Task<UserModel> FindById(int id)
        {
            return await DBContext.Users.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<UserModel> Update(UserModel user, int id)
        {
            UserModel userByid = await FindById(id);
            if(userByid==null)
            {
                throw new Exception("User not found");
            }

            userByid.Name = user.Name;
            userByid.Age = user.Age;
            userByid.Password = user.Password;

            DBContext.Users.Update(userByid);
            await DBContext.SaveChangesAsync();
            return userByid;
        }
    }
}
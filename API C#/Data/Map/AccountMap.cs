using Microsoft.EntityFrameworkCore;
using PaymentAPI.Models;

namespace PaymentAPI.Data.Map
{
    public class AccountMap : IEntityTypeConfiguration<AccountModel>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<AccountModel> builder)
        {

            builder.HasKey(a => a.AccountId);
            builder.HasAlternateKey(a => a.Number);
            builder.Property(a => a.Value);
            builder.Property(a => a.UserId);
            builder.Property(a => a.Code);
            builder.HasOne(a => a.User);
        }
    }
}
namespace PaymentAPI.Models
{
    public class AccountModel
    {
        public int AccountId   {get;set;}
        public int Number {get;set;}
        public decimal Value { get; set; }
        public int? UserId {get; set;}
        public string? Code { get; set; }

        public virtual UserModel? User {get;set;}
    }
}
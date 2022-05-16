using System;
using TDD.AuctionSys.Core;

namespace TDD.AucionTests
{
    static class CoreTests
    {
        public static void Main()
        {
            var cor = Console.ForegroundColor;

            ReturnBestBid_MustPass();
            OneBidAuction_MustPass();

            Console.ForegroundColor = cor;
        }

        private static void ReturnBestBid_MustPass()
        {
            //Arrange
            var auction = new Auction("Van Gogh");
            var personA = new Bider("John", auction);
            var personB = new Bider("Mary", auction);

            auction.GetBid(personA, 800);
            auction.GetBid(personB, 900);
            auction.GetBid(personA, 1000);

            //Act
            auction.StopAuction();

            //Assert
            var expectedValue = 1000;
            var actualValue = auction.Winner.Value;

            VerifyAuctionBid(expectedValue, actualValue);
        }

        private static void VerifyAuctionBid(int expectedValue, double actualValue)
        {
            if (expectedValue == actualValue)
            {
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("TEST OK");
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"TEST FAIL! Expected: {expectedValue}, actual: {actualValue}");
            }

        }

        private static void OneBidAuction_MustPass()
        {
            //Arrange
            var auction = new Auction("Van Gogh");
            var personA = new Bider("John", auction);

            auction.GetBid(personA, 800);

            //Act
            auction.StopAuction();

            //Assert
            var expectedValue = 800;
            var actualValue = auction.Winner.Value;

            VerifyAuctionBid(expectedValue, actualValue);
        }
    }
}

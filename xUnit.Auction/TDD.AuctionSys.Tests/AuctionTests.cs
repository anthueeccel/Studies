using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TDD.AuctionSys.Core;
using Xunit;

namespace TDD.AuctionSys.Tests
{
    public class AuctionTests
    {

        [Fact]
        public void MustPass_ReturnBestBid()
        {
            //Arrange
            var auction = new Auction("Van Gogh");
            var personA = new Bider("John", auction);
            var personB = new Bider("Mary", auction);

            auction.GetBid(personA, 600);
            auction.GetBid(personB, 900);
            auction.GetBid(personA, 1000);

            //Act
            auction.StopAuction();

            //Assert
            var expectedValue = 1000;
            var actualValue = auction.Winner.Value;

            Assert.Equal(expectedValue, actualValue);
        }

        [Fact]
        public void MustPass_OneBidAuction()
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

            Assert.Equal(expectedValue, actualValue);
        }
    }
}

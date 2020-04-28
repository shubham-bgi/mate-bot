function getClanDetails() {
    axios.get(clanDetailsUrl)
    .then(response => {
      checkClanActive(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }
  function getPlayerDetails() {
    axios.get(playerDetailsUrl)
    .then(response => {
      checkPlayerActive(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }
  function checkPlayerActive(response) { 
  }
  function checkClanActive(data) {
      console.log(data);
  }
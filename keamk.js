function updateMemberRating(id, rating) {
  chrome.storage.local.get("Members", function (data) {
    update(data.Members, id, rating); //storing the storage value in a variable and passing to update function
  });
}

function update(members, id, skill) {
  if (!(members instanceof Array)) members = new Array();
  members = updateMembers(members, id, skill);
  //then call the set to update with modified value
  chrome.storage.local.set({ Members: members });
}

function findMember(members, id) {
  if (members instanceof Array)
    for (i of members) {
      if (i.id == id) return i;
    }
  return null;
}

function updateMembers(members, id, skill) {
  if (members instanceof Array)
    for (var i in members) {
      if (members[i].id == id) {
        members[i].skill = skill;
        return members; //Stop this loop, we found it!
      }
    }
  members.push({ id: id, skill: skill });
  return members;
}

function setRatingsAndListeners(participants, offset) {
  chrome.storage.local.get("Members", function (data) {
    var members = data.Members;

    //document.querySelector("#mix_players_12_level > label:nth-child(5)").classList.add('level-hover');
    //document.querySelector("#mix_players_12_level > label:nth-child(5)").classList.add('level-hover');

    for (var i = 0; i < participants.length; i++) {
      var member = findMember(members, participants[i].id);
      for (var l of [0, 1, 2, 3, 4]) {
        var selector =
          "#mix_players_" +
          (offset + i) +
          "_level > label:nth-child(" +
          (l * 2 + 1) +
          ")";
        var elem = document.querySelector(selector);
        if (member && l < member.skill) {
          elem.classList.add("level-hover");
          document.querySelector(
            "#mix_players_" + (offset + i) + "_level_" + (l + 1)
          ).checked = true;
        }
        elem.addEventListener(
          "click",
          updateMemberRating.bind(this, participants[i].id, l + 1)
        );
      }
    }
  });
}

document.getElementById("mix_typeMix_2").click(); // Click on the "Skill Level" button
chrome.storage.local.get("Event_name", function (data) {
  document.getElementById("mix_title").value = data.Event_name;
});
var nTeams = parseInt(document.getElementById("nb-teams").value, 10);
for (var i = 0; i < nTeams; i++) {
  document.querySelector("#mix_teams_" + i + "_name").value = i + 1;
}
chrome.storage.local.get("Participants", function (data) {
  console.log(data);
  var count = data.Participants.length;
  if (count > 0) {
    var offset = parseInt(document.getElementById("nb-participants").value, 10);

    // Prepare a list of names and feed it as an input
    var text = "";
    for (person of data.Participants) {
      text += person.name + "\n";
    }
    document.querySelector("#import-participant-list").textContent = text;
    document.querySelector("#import-p-button").click();
    document
      .querySelector("#import-participant")
      .setAttribute("style", "display: none;");

    setRatingsAndListeners(data.Participants, offset);
  }
  chrome.storage.local.set({ Participants: [] });
});

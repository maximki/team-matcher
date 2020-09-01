var link_id = "manage_teams";
var refreshRate = 1000; // in microseconds
window.addEventListener("load", resetTimer);
console.log("Meetup event attendies ");

var makeTeams = null;

function resetTimer() {
  setInterval(addMakeTeamsLink, refreshRate);
}

function getPageInfo() {
  var url_from_meta = document.querySelector("meta[property='og:url']");
  var page_url = new URL(
    url_from_meta ? url_from_meta.getAttribute("content") : window.location.href
  );
  var path_parts = [];
  var group_id = "";
  var event_id = "";

  path_parts = page_url.pathname.split("/");
  group_id = path_parts[1];
  event_id = path_parts[3];
  console.log("Meetup. group id: '" + group_id + "' event id: " + event_id);
  return { group_id: group_id, event_id: event_id, url: page_url };
}

function makeTeamsLinkVisabilityToggle(mutationsList, observer) {
  mutationsList.forEach((mutation) => {
    if (mutation.attributeName === "class") {
      if (!makeTeams) return;

      // make the button available only when the Going tab is selected
      if (mutation.target.classList.contains("tabs-tab--selected")) {
        makeTeams.dataset.swarmButton = "primary";
        makeTeams.style.pointerEvents = "all";
      } else {
        makeTeams.dataset.swarmButton = "disabled";
        makeTeams.style.pointerEvents = "none";
      }
    }
  });
}

function getPersonId(profileLink) {
  // Example: .../Smiley-Social/members/123456789/profile
  var parts = profileLink.split("/");
  return parts[parts.indexOf("members") + 1];
}

function storeParticipantsAndRedirectToKeamk(group_id, event_id) {
  var attendees = document.querySelectorAll(
    "li.attendee-item.list-item  a[href^='/Smiley-Social/members/'] > h4"
  );
  // prepare a list of {person_id, person_name} from the event attendies
  var list = [];
  for (let name of attendees) {
    var link = name.parentElement;
    var id = getPersonId(link.href);
    list.push({ id: id, name: name.innerText });
  }
  console.log("storeParticipantsAndRedirectToKeamk " + attendees.length);

  if (list.length > 0) {
    var title = document.title.split(" | ");
    if (title.length > 1) title = title[1];
    else title = document.title;

    // Store data for keamk.js to parse
    chrome.storage.local.set({ Participants: list });
    chrome.storage.local.set({ Event_name: title });

    console.log("Redirrecting to https://www.keamk.com/random-team-generator");
    document.location.href = "https://www.keamk.com/random-team-generator";
    window.location.href = "https://www.keamk.com/random-team-generator";
  }
}

function addMakeTeamsLink() {
  // avoid adding 2nd, 3rd, ... links
  if (document.getElementById(link_id)) return;

  var tabs = document.querySelector(".attendees-response-filter");
  if (!tabs) return;

  var goingTab = tabs.querySelector(".response-filter-yes");
  if (!goingTab) return;

  var event = getPageInfo();
  var group_id = event.group_id;
  var event_id = event.event_id;

  // wrap the tab section in div to add the button on the right
  var tabsDiv = document.createElement("div");
  tabsDiv.className = "flex flex--row";
  tabs.insertAdjacentElement("beforebegin", tabsDiv);
  tabs.classList.add("flex-item");
  tabsDiv.appendChild(tabs);

  // Create the "Make Teams" button
  makeTeams = document.createElement("a");
  makeTeams.id = link_id;
  makeTeams.className = "padding--left padding--right margin--top";
  makeTeams.dataset.swarmButton = "primary";
  makeTeams.dataset.swarmSize = "default";
  makeTeams.dataset.icon = "right";
  makeTeams.dataset.swarmWidth = "default";
  makeTeams.href = "javascript:void(0);";
  makeTeams.innerHTML = "<span>Make teams</span>";
  makeTeams.addEventListener("click", function () {
    storeParticipantsAndRedirectToKeamk(group_id, event_id);
  });
  tabsDiv.appendChild(makeTeams);

  // observe changes in the Going tab style -> the Going tab being active/non-active
  const mutationObserver = new MutationObserver(makeTeamsLinkVisabilityToggle);
  mutationObserver.observe(goingTab, { attributes: true });
}

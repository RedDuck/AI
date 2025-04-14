let gameState = { 
  class: null,
  stats: { STR: 3, DEX: 3, INT: 3 },
  inventory: [],
  currentScene: 'start'
};

function startNewGame() {
  document.getElementById('main-menu').style.display = 'none';
  document.getElementById('game-container').style.display = 'grid';
  gameState = {
    class: null,
    stats: { STR: 3, DEX: 3, INT: 3 },
    inventory: [],
    currentScene: 'start'
  };
  chooseClass();
}

function loadGame() {
  const saved = JSON.parse(localStorage.getItem('horrorGameSave'));
  if (saved) {
    gameState = saved;
    updateUI();
    showScene(saved.currentScene);
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('game-container').style.display = 'grid';
  } else {
    alert('No saved game found.');
  }
}

function saveGame(showAlert = false) {
  localStorage.setItem('horrorGameSave', JSON.stringify(gameState));
  if (showAlert) alert('Game saved!');
}

function quitGame() {
  location.reload();
}

function chooseClass() {
  document.getElementById('narrative').innerHTML = `<p>Choose your class:</p>`;
  const choices = document.getElementById('choices');
  choices.innerHTML = '';
  ['Soldier', 'Engineer', 'Pilot'].forEach(cls => {
    const btn = document.createElement('button');
    btn.textContent = cls;
    btn.onclick = () => {
      gameState.class = cls;
      if (cls === 'Soldier') gameState.stats.STR++;
      if (cls === 'Engineer') gameState.stats.INT++;
      if (cls === 'Pilot') gameState.stats.DEX++;
      updateUI();
      showScene('scene1');
    };
    choices.appendChild(btn);
  });
}

function updateUI() {
  document.getElementById('char-class').textContent = `Class: ${gameState.class}`;
  const s = gameState.stats;
  document.getElementById('char-stats').textContent = `STR: ${s.STR} | DEX: ${s.DEX} | INT: ${s.INT}`;
  showInventory(); // Update inventory display
}

function showInventory() {
  const inventoryContainer = document.getElementById('inventory');
  inventoryContainer.innerHTML = ''; // Clear current inventory display

  if (gameState.inventory.length === 0) {
    inventoryContainer.innerHTML = '<p>Your inventory is empty.</p>';
  } else {
    const itemList = document.createElement('ul');
    gameState.inventory.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = item;
      itemList.appendChild(listItem);
    });
    inventoryContainer.appendChild(itemList);
  }
}

function showScene(sceneId) {
  gameState.currentScene = sceneId;
  saveGame(false);

  const scenes = {
    scene1: {
      img: 'images/airlock.jpg',
      text: `You awaken in a dark corridor. The emergency lights flicker. There's a sealed airlock to your left.`,
      choices: [
        {
          text: 'Open the airlock',
          condition: () => gameState.stats.STR >= 4,
          success: 'scene2',
          failure: () => alert('You need more strength to force it open.')
        },
        {
          text: 'Look for another way',
          next: 'scene3'
        }
      ]
    },
    scene2: {
      img: 'images/airlock-open.jpg',
      text: `With a grunt, you force the airlock open. Beyond lies a maintenance tunnel bathed in red light.`,
      choices: [
        {
          text: 'Crawl through the tunnel',
          next: 'scene4'
        },
        {
          text: 'Return to corridor',
          next: 'scene1'
        }
      ]
    },
    scene3: {
      img: 'images/corridor.jpg',
      text: `You move down the corridor, passing flickering lights and broken panels. A strange noise echoes behind you.`,
      choices: [
        {
          text: 'Keep walking',
          next: 'scene5'
        },
        {
          text: 'Hide and wait',
          next: 'scene6'
        }
      ]
    },
    scene4: {
      img: 'images/maintenance-tunnel.jpg',
      text: `You crawl through the tight tunnel, the red light casting eerie shadows. Ahead, you see a junction with a vent to the right and a hatch downward.`,
      choices: [
        {
          text: 'Take the vent',
          next: 'scene7'
        },
        {
          text: 'Climb down the hatch',
          next: 'scene8'
        }
      ]
    },
    scene5: {
      img: 'images/alien-encounter.jpg',
      text: `Suddenly, you hear a loud screech and a shadow looms ahead. An alien creature stands in your path.`,
      choices: [
        {
          text: 'Fight the creature',
          next: 'scene9'
        },
        {
          text: 'Run and hide',
          next: 'scene10'
        }
      ]
    },
    scene6: {
      img: 'images/hidden.jpg',
      text: `You hide in a nearby maintenance closet, holding your breath. The creature passes, but it stops to sniff the air.`,
      choices: [
        {
          text: 'Wait it out',
          next: 'scene11'
        },
        {
          text: 'Make a break for it',
          next: 'scene12'
        }
      ]
    },
    scene7: {
      img: 'images/vent.jpg',
      text: `You squeeze through the narrow vent, your movement slow and careful. Suddenly, a faint sound of breathing echoes ahead.`,
      choices: [
        {
          text: 'Proceed cautiously',
          next: 'scene13'
        },
        {
          text: 'Retreat back to junction',
          next: 'scene4'
        }
      ]
    },
    scene8: {
      img: 'images/hatch.jpg',
      text: `You climb down the hatch and enter a dimly lit storage bay. There's a strange smell in the air, and broken crates are scattered around.`,
      choices: [
        {
          text: 'Inspect the crates',
          next: 'scene14'
        },
        {
          text: 'Look for a terminal',
          next: 'scene15'
        }
      ]
    },
    scene9: {
      img: 'images/alien-fight.jpg',
      text: `You engage the creature in a fierce battle. It scratches and slashes, but you manage to dodge and retaliate.`,
      choices: [
        {
          text: 'Continue fighting',
          next: 'scene16'
        },
        {
          text: 'Retreat and escape',
          next: 'scene17'
        }
      ]
    },
    scene10: {
      img: 'images/escape.jpg',
      text: `You run down the corridor, adrenaline pumping, and manage to evade the creature. You find a secure hiding spot to catch your breath.`,
      choices: [
        {
          text: 'Search the area for supplies',
          next: 'scene18'
        },
        {
          text: 'Continue down the corridor',
          next: 'scene19'
        }
      ]
    },
    scene11: {
      img: 'images/hidden-room.jpg',
      text: `The creature passes without noticing you. You breathe a sigh of relief but know you can’t stay hidden forever.`,
      choices: [
        {
          text: 'Wait a little longer',
          next: 'scene20'
        },
        {
          text: 'Leave the closet and move forward',
          next: 'scene21'
        }
      ]
    },
    scene12: {
      img: 'images/escape-pod.jpg',
      text: `You dash toward an emergency escape pod and manage to launch it just as the station begins to implode.`,
      choices: [
        {
          text: 'Wait for rescue',
          next: 'scene22'
        },
        {
          text: 'Attempt to repair the pod',
          next: 'scene23'
        }
      ]
    },
    scene13: {
      img: 'images/alien-encounter.jpg',
      text: `You proceed through the vent cautiously but then find yourself face to face with a group of hostile aliens.`,
      choices: [
        {
          text: 'Fight them off',
          next: 'scene24'
        },
        {
          text: 'Retreat to safety',
          next: 'scene25'
        }
      ]
    },

    scene14: {
      img: 'images/crates.jpg',
      text: `You approach the crates and begin searching them. Inside one of them, you find a strange device and a couple of energy cells.`,
      choices: [
        {
          text: 'Take the device and energy cells',
          success: 'scene15',
          next: 'scene15'
        },
        {
          text: 'Leave them behind',
          next: 'scene16'
        }
      ]
    },
    scene15: {
      img: 'images/terminal.jpg',
      text: `You find a nearby terminal and begin to investigate it. It appears to be connected to the station’s mainframe, and you might be able to unlock more areas if you hack it.`,
      choices: [
        {
          text: 'Hack the terminal',
          condition: () => gameState.stats.INT >= 4,
          success: 'scene17',
          failure: 'scene18'
        },
        {
          text: 'Leave the terminal and move on',
          next: 'scene19'
        }
      ]
    },
    scene16: {
      img: 'images/empty-room.jpg',
      text: `You decide not to take the items. As you walk deeper into the storage bay, you hear a loud bang, and the door slams shut behind you.`,
      choices: [
        {
          text: 'Try to escape through the window',
          next: 'scene20'
        },
        {
          text: 'Wait for help',
          next: 'scene21'
        }
      ]
    },
    scene17: {
      img: 'images/terminal-hack.jpg',
      text: `You successfully hack into the terminal and unlock a new area of the station. A map appears on the screen, marking a hidden escape route.`,
      choices: [
        {
          text: 'Follow the new escape route',
          next: 'scene22'
        },
        {
          text: 'Investigate the area for more clues',
          next: 'scene23'
        }
      ]
    },
    scene18: {
      img: 'images/terminal-failure.jpg',
      text: `The terminal is more secure than you expected. Your hack fails, and an alarm goes off, alerting nearby enemies.`,
      choices: [
        {
          text: 'Fight the enemies',
          next: 'scene24'
        },
        {
          text: 'Run and hide',
          next: 'scene25'
        }
      ]
    },
    scene19: {
      img: 'images/escape-tunnel.jpg',
      text: `You leave the terminal and begin to follow the hallway. Ahead, you notice a faint light shining from an emergency exit.`,
      choices: [
        {
          text: 'Head toward the exit',
          next: 'scene26'
        },
        {
          text: 'Investigate the dark room nearby',
          next: 'scene27'
        }
      ]
    },
    scene20: {
      img: 'images/escape-window.jpg',
      text: `You attempt to break through the window, but it’s reinforced. The loud noise of your struggle only attracts more attention.`,
      choices: [
        {
          text: 'Try to escape through the ventilation shafts',
          next: 'scene28'
        },
        {
          text: 'Wait for a better opportunity',
          next: 'scene29'
        }
      ]
    },
    scene21: {
      img: 'images/hiding.jpg',
      text: `You decide to stay put and wait. Time passes, and the noise gradually fades. After what feels like hours, the door opens and you slip out unnoticed.`,
      choices: [
        {
          text: 'Continue your journey',
          next: 'scene30'
        },
        {
          text: 'Look for more supplies',
          next: 'scene31'
        }
      ]
    },
    scene22: {
      img: 'images/new-path.jpg',
      text: `Following the newly unlocked escape route, you come across a large maintenance hatch. It looks like a one-way ticket out of here.`,
      choices: [
        {
          text: 'Climb through the hatch',
          next: 'scene32'
        },
        {
          text: 'Search the area for more equipment',
          next: 'scene33'
        }
      ]
    },
    scene23: {
      img: 'images/clues.jpg',
      text: `You investigate the area for any additional clues. Amongst the debris, you find a strange keycard, which may open a restricted area.`,
      choices: [
        {
          text: 'Take the keycard',
          next: 'scene34'
        },
        {
          text: 'Leave the keycard behind and continue',
          next: 'scene35'
        }
      ]
    },
    scene24: {
      img: 'images/battle.jpg',
      text: `The fight is brutal, but your determination prevails. You manage to defeat the enemies and regain control of the area.`,
      choices: [
        {
          text: 'Search the fallen enemies for supplies',
          next: 'scene36'
        },
        {
          text: 'Continue to the exit',
          next: 'scene37'
        }
      ]
    },
    scene25: {
      img: 'images/hiding.jpg',
      text: `You manage to slip away, hiding in the shadows. After a few tense moments, the enemies move on.`,
      choices: [
        {
          text: 'Rejoin the main path',
          next: 'scene38'
        },
        {
          text: 'Search the area for supplies',
          next: 'scene39'
        }
      ]
    },
    scene26: {
      img: 'images/escape-hatch.jpg',
      text: `You rush toward the emergency exit, but the door refuses to budge. It appears to be locked with a biometric scanner.`,
      choices: [
        {
          text: 'Search for a code to unlock the door',
          next: 'scene40'
        },
        {
          text: 'Look for another way out',
          next: 'scene41'
        }
      ]
    },
    scene27: {
      img: 'images/dark-room.jpg',
      text: `You enter the dark room, only to be greeted by the sight of a damaged computer terminal. There’s a faint signal from an unknown source.`,
      choices: [
        {
          text: 'Try to access the signal',
          next: 'scene42'
        },
        {
          text: 'Leave the room and continue',
          next: 'scene43'
        }
      ]
    },
    scene28: {
      img: 'images/ventilation-shaft.jpg',
      text: `You manage to pry open the ventilation shaft, crawling through the narrow space. It leads you to a more secure part of the station.`,
      choices: [
        {
          text: 'Look for a way out',
          next: 'scene44'
        },
        {
          text: 'Explore the area for supplies',
          next: 'scene45'
        }
      ]
    },
    scene29: {
      img: 'images/hiding-room.jpg',
      text: `You stay hidden for a while longer, but the tension is unbearable. After some time, you finally emerge, and the coast is clear.`,
      choices: [
        {
          text: 'Search the area for resources',
          next: 'scene46'
        },
        {
          text: 'Continue down the hall',
          next: 'scene47'
        }
      ]
    },
    scene30: {
      img: 'images/escape-route.jpg',
      text: `You continue your journey, but the atmosphere is thick with tension. The station seems to be falling apart around you.`,
      choices: [
        {
          text: 'Investigate the sound ahead',
          next: 'scene48'
        },
        {
          text: 'Head to the escape hatch',
          next: 'scene49'
        }
      ]
    },
    scene31: {
      img: 'images/supply-room.jpg',
      text: `You find a small storage room filled with supplies. There are medical kits, food rations, and a few tools that could come in handy.`,
      choices: [
        {
          text: 'Take everything',
          next: 'scene50'
        },
        {
          text: 'Leave the supplies behind',
          next: 'scene51'
        }
      ]
    },
    scene32: {
      img: 'images/escape-pod.jpg',
      text: `You climb through the hatch and enter a large escape pod. It’s damaged, but you may be able to make it work.`,
      choices: [
        {
          text: 'Attempt to repair the escape pod',
          next: 'scene52'
        },
        {
          text: 'Search for another escape route',
          next: 'scene53'
        }
      ]
    },
    scene33: {
      img: 'images/maintenance-room.jpg',
      text: `You find yourself in a maintenance room filled with tools and spare parts. Some of these may help you navigate the station.`,
      choices: [
        {
          text: 'Take tools and parts',
          next: 'scene54'
        },
        {
          text: 'Leave the room',
          next: 'scene55'
        }
      ]
    },
    scene34: {
      img: 'images/keycard.jpg',
      text: `You take the keycard. It feels heavy in your hand, and you’re unsure where it might lead.`,
      choices: [
        {
          text: 'Look for a restricted area to use the keycard',
          next: 'scene56'
        },
        {
          text: 'Search for another exit',
          next: 'scene57'
        }
      ]
    },
    scene35: {
      img: 'images/abandoned-hallway.jpg',
      text: `You leave the keycard behind and continue down the hallway. It’s eerily quiet, and you can’t shake the feeling you’re being watched.`,
      choices: [
        {
          text: 'Investigate the strange noise ahead',
          next: 'scene58'
        },
        {
          text: 'Head toward the escape hatch',
          next: 'scene59'
        }
      ]
    },
    scene36: {
      img: 'images/alien-head.jpg',
      text: `You search the fallen enemies and find several useful items, including a strange alien artifact.`,
      choices: [
        {
          text: 'Take the artifact',
          next: 'scene60'
        },
        {
          text: 'Leave the artifact and move on',
          next: 'scene61'
        }
      ]
    },
    scene37: {
      img: 'images/corridor.jpg',
      text: `You continue down the corridor, your heart racing as you approach the exit. It’s just ahead.`,
      choices: [
        {
          text: 'Head for the exit',
          next: 'scene62'
        },
        {
          text: 'Take a different route to explore more',
          next: 'scene63'
        }
      ]
    },
    scene38: {
      img: 'images/dark-corridor.jpg',
      text: `You make your way back to the main path, but the corridor ahead is dark and foreboding. Something feels off.`,
      choices: [
        {
          text: 'Continue down the corridor',
          next: 'scene64'
        },
        {
          text: 'Hide and observe',
          next: 'scene65'
        }
      ]
    },
    scene39: {
      img: 'images/supply-pile.jpg',
      text: `You search the area and find several useful items. It’s a small pile of resources, but it might help you in the long run.`,
      choices: [
        {
          text: 'Take the supplies',
          next: 'scene66'
        },
        {
          text: 'Leave the supplies and continue',
          next: 'scene67'
        }
      ]
    },
    scene40: {
      img: 'images/locked-door.jpg',
      text: `You search the area for a code, but the door remains locked. Without it, you can’t open the exit.`,
      choices: [
        {
          text: 'Look for an alternate way out',
          next: 'scene68'
        },
        {
          text: 'Search the room for a way to unlock it',
          next: 'scene69'
        }
      ]
    },
    scene41: {
      img: 'images/vent.jpg',
      text: `You find a small vent and crawl through it. It leads you into an abandoned section of the station.`,
      choices: [
        {
          text: 'Explore the abandoned section',
          next: 'scene70'
        },
        {
          text: 'Look for another exit',
          next: 'scene71'
        }
      ]
    },
    scene42: {
      img: 'images/terminal-signal.jpg',
      text: `You manage to access the signal, and it appears to be a distress call from a nearby ship.`,
      choices: [
        {
          text: 'Respond to the distress call',
          next: 'scene72'
        },
        {
          text: 'Ignore the call and continue exploring',
          next: 'scene73'
        }
      ]
    },
    scene43: {
      img: 'images/empty-room.jpg',
      text: `You leave the room and continue down the hall. It’s still eerily quiet, but something feels wrong.`,
      choices: [
        {
          text: 'Investigate the strange noise ahead',
          next: 'scene74'
        },
        {
          text: 'Continue to the escape route',
          next: 'scene75'
        }
      ]
    },
    scene44: {
      img: 'images/maintenance-vent.jpg',
      text: `You crawl through the vent, hoping it will lead you to safety. It opens into a larger maintenance shaft.`,
      choices: [
        {
          text: 'Explore the shaft',
          next: 'scene76'
        },
        {
          text: 'Look for another way out',
          next: 'scene77'
        }
      ]
    },
    scene45: {
      img: 'images/maintenance-supplies.jpg',
      text: `You find a stash of supplies in the maintenance area. It includes tools, food, and medical kits.`,
      choices: [
        {
          text: 'Take everything',
          next: 'scene78'
        }
      ]
    },
    
    scene35: {
      img: 'images/abandoned-lab.jpg',
      text: `You stumble upon an abandoned lab deep within the ship's bowels. Broken glass and flickering lights give the place an eerie feel.`,
      choices: [
        {
          text: 'Search the lab for supplies',
          next: 'scene36'
        },
        {
          text: 'Leave the lab and continue exploring',
          next: 'scene17'
        }
      ]
    },
    scene36: {
      img: 'images/locked-vault.jpg',
      text: `In the back of the lab, you find a locked vault. It looks like it might contain valuable supplies or weapons.`,
      choices: [
        {
          text: 'Try to break into the vault',
          condition: () => gameState.stats.STRENGTH >= 4,
          success: 'scene37',
          failure: () => alert('You can\'t force the vault open, it’s too secure.')
        },
        {
          text: 'Search for a key or code elsewhere',
          next: 'scene37a'
        }
      ]
    },
    scene37: {
      img: 'images/open-vault.jpg',
      text: `With some effort, you manage to break into the vault. Inside, you find advanced weapons and medical supplies.`,
      choices: [
        {
          text: 'Take the weapons',
          next: 'scene38',
          effect: () => {
            if (!gameState.inventory.includes('Advanced Weapon')) {
              gameState.inventory.push('Advanced Weapon');
            }
          }
        },
        {
          text: 'Take the medical supplies',
          next: 'scene39',
          effect: () => {
            if (!gameState.inventory.includes('Med Kit')) {
              gameState.inventory.push('Med Kit');
            }
          }
        },
        {
          text: 'Leave everything and exit the lab',
          next: 'scene17'
        }
      ]
    },
    scene37a: {
      img: 'images/security-code.jpg',
      text: `You find a hidden compartment with a security terminal. It looks like you could hack into it and retrieve the vault code.`,
      choices: [
        {
          text: 'Hack into the terminal',
          condition: () => gameState.stats.INT >= 3,
          success: 'scene37',
          failure: () => alert('You can\'t access the security system.')
        },
        {
          text: 'Leave the lab and move on',
          next: 'scene17'
        }
      ]
    },
    scene38: {
      img: 'images/advanced-weapon.jpg',
      text: `You pick up a sleek, high-tech weapon. It feels light but powerful. You wonder how many enemies you’ll be able to defeat with it.`,
      choices: [
        {
          text: 'Check the weapon’s stats',
          next: 'scene40'
        },
        {
          text: 'Store the weapon in your inventory',
          next: 'scene17'
        }
      ]
    },
    scene39: {
      img: 'images/med-kit.jpg',
      text: `You grab the med kit. It looks like it contains everything you need to heal wounds and even counter some toxins.`,
      choices: [
        {
          text: 'Examine the med kit for useful items',
          next: 'scene41'
        },
        {
          text: 'Store the med kit in your inventory',
          next: 'scene17'
        }
      ]
    },
    scene40: {
      img: 'images/weapon-stats.jpg',
      text: `The weapon has high damage potential and can fire rapid bursts. It's designed to cut through tough armor. This could be very useful against heavy enemies.`,
      choices: [
        {
          text: 'Equip the weapon',
          effect: () => gameState.inventory.push('Equipped Advanced Weapon'),
          next: 'scene17'
        },
        {
          text: 'Store the weapon for later',
          next: 'scene17'
        }
      ]
    },
    scene41: {
      img: 'images/med-kit-examined.jpg',
      text: `The med kit contains advanced painkillers, bandages, and even an anti-toxin injector. It should be more than enough for any injuries you might sustain.`,
      choices: [
        {
          text: 'Use the med kit to heal',
          next: 'scene42',
          effect: () => {
            if (gameState.health < 100) {
              gameState.health += 20;  // Heals the player for 20 health points
            }
          }
        },
        {
          text: 'Store the med kit for later',
          next: 'scene17'
        }
      ]
    },
    scene42: {
      img: 'images/healed.jpg',
      text: `You feel the effects of the med kit almost instantly. Your health is significantly improved.`,
      choices: [
        {
          text: 'Continue exploring the ship',
          next: 'scene17'
        },
        {
          text: 'Check the ship’s map for new areas',
          next: 'scene43'
        }
      ]
    },
    scene43: {
      img: 'images/ship-map.jpg',
      text: `The map reveals several new locations on the ship, including a cargo bay, an observation deck, and an abandoned crew quarters.`,
      choices: [
        {
          text: 'Go to the cargo bay',
          next: 'scene44'
        },
        {
          text: 'Go to the observation deck',
          next: 'scene45'
        },
        {
          text: 'Explore the abandoned crew quarters',
          next: 'scene46'
        }
      ]
    },
    scene44: {
      img: 'images/cargo-bay.jpg',
      text: `You enter the cargo bay, which is dimly lit and filled with crates and containers. It seems like a place where supplies are stored, but there’s a strange odor in the air.`,
      choices: [
        {
          text: 'Search the cargo containers for useful items',
          next: 'scene47'
        },
        {
          text: 'Leave the cargo bay and move on',
          next: 'scene17'
        }
      ]
    },
    scene45: {
      img: 'images/observation-deck.jpg',
      text: `The observation deck is abandoned, and the windows show the vast emptiness of space. It’s eerily quiet, but you feel a strange presence.`,
      choices: [
        {
          text: 'Look out the window at the stars',
          next: 'scene48'
        },
        {
          text: 'Leave the observation deck',
          next: 'scene17'
        }
      ]
    },
    scene46: {
      img: 'images/crew-quarters.jpg',
      text: `The crew quarters are a mess, with overturned furniture and signs of a struggle. Something is definitely not right.`,
      choices: [
        {
          text: 'Search the quarters for clues',
          next: 'scene49'
        },
        {
          text: 'Leave the quarters and continue exploring',
          next: 'scene17'
        }
      ]
    },
    scene47: {
      img: 'images/cargo-search.jpg',
      text: `You find a crate full of supplies, including food rations, weapons, and a strange device with glowing runes.`,
      choices: [
        {
          text: 'Take the strange device',
          next: 'scene50',
          effect: () => {
            if (!gameState.inventory.includes('Strange Device')) {
              gameState.inventory.push('Strange Device');
            }
          }
        },
        {
          text: 'Take the weapons and rations',
          next: 'scene51',
          effect: () => {
            if (!gameState.inventory.includes('Rations')) {
              gameState.inventory.push('Rations');
            }
            if (!gameState.inventory.includes('Cargo Weapon')) {
              gameState.inventory.push('Cargo Weapon');
            }
          }
        },
        {
          text: 'Leave everything and exit the cargo bay',
          next: 'scene17'
        }
      ]
    },
    scene48: {
      img: 'images/stars.jpg',
      text: `The view is breathtaking, but you can’t help but feel a sense of isolation. You wonder if anyone else is left alive on the ship.`,
      choices: [
        {
          text: 'Try to contact the bridge',
          next: 'scene52'
        },
        {
          text: 'Leave the observation deck and continue exploring',
          next: 'scene17'
        }
      ]
    },
    scene49: {
      img: 'images/crew-search.jpg',
      text: `Among the chaos, you find a crew member’s journal. It speaks of strange happenings aboard the ship and an alien presence.`,
      choices: [
        {
          text: 'Read the journal for more information',
          next: 'scene53'
        },
        {
          text: 'Take the journal and leave',
          next: 'scene54'
        }
      ]
    },
    scene50: {
      img: 'images/strange-device.jpg',
      text: `The strange device glows with an eerie light. It feels like it’s alive, humming with power.`,
      choices: [
        {
          text: 'Examine the device',
          next: 'scene55'
        },
        {
          text: 'Store the device in your inventory',
          next: 'scene17'
        }
      ]
    },
    scene51: {
      img: 'images/cargo-items.jpg',
      text: `You take the rations and weapons, making sure to stock up for the journey ahead. It’s always good to be prepared.`,
      choices: [
        {
          text: 'Continue exploring the ship',
          next: 'scene17'
        },
        {
          text: 'Rest and eat some rations',
          next: 'scene56',
          effect: () => {
            gameState.health += 10;
          }
        }
      ]
    },
    scene52: {
      img: 'images/bridge-contact.jpg',
      text: `You try to reach the bridge, but the communication system seems to be down. No response comes through the static.`,
      choices: [
        {
          text: 'Investigate the communication systems',
          next: 'scene57'
        },
        {
          text: 'Move on to another area of the ship',
          next: 'scene17'
        }
      ]
    },
    scene53: {
      img: 'images/journal-entries.jpg',
      text: `The journal mentions an experiment gone wrong. It looks like the crew was experimenting with alien technology. The last entry warns about “something awakening.”`,
      choices: [
        {
          text: 'Investigate the alien technology mentioned in the journal',
          next: 'scene58'
        },
        {
          text: 'Leave the journal and continue exploring',
          next: 'scene17'
        }
      ]
    },
    scene54: {
      img: 'images/journal-taken.jpg',
      text: `You pocket the journal. Perhaps it will help you later when you try to figure out what happened here.`,
      choices: [
        {
          text: 'Continue exploring the ship',
          next: 'scene17'
        },
        {
          text: 'Check your inventory for more clues',
          next: 'scene17'
        }
      ]
    },
    scene55: {
      img: 'images/device-examined.jpg',
      text: `You examine the device closely. There’s a strange insignia on it, one you’ve seen before, but it’s faint and hard to make out.`,
      choices: [
        {
          text: 'Activate the device',
          next: 'scene59'
        },
        {
          text: 'Put the device in your inventory',
          next: 'scene17'
        }
      ]
    },
    scene56: {
      img: 'images/resting.jpg',
      text: `You take some time to rest and eat. Your energy is restored, and you feel ready to tackle whatever comes next.`,
      choices: [
        {
          text: 'Continue exploring the ship',
          next: 'scene17'
        }
      ]
    },
    scene57: {
      img: 'images/communication-system.jpg',
      text: `You find the communication console in the bridge, but it’s heavily damaged. It might take some time to repair.`,
      choices: [
        {
          text: 'Try to repair the communication system',
          condition: () => gameState.stats.INT >= 5,
          success: 'scene60',
          failure: () => alert('You can’t repair the system with the tools you have.')
        },
        {
          text: 'Leave the bridge and look for other ways out',
          next: 'scene17'
        }
      ]
    },
    scene58: {
      img: 'images/alien-technology.jpg',
      text: `You find a lab filled with alien devices. One of them looks familiar from the journal entries.`,
      choices: [
        {
          text: 'Inspect the device',
          next: 'scene61'
        },
        {
          text: 'Leave the alien technology and move on',
          next: 'scene17'
        }
      ]
    },
    scene59: {
      img: 'images/device-activated.jpg',
      text: `The device hums loudly and emits a bright flash. Suddenly, a portal opens up in front of you.`,
      choices: [
        {
          text: 'Step through the portal',
          next: 'scene62'
        },
        {
          text: 'Deactivate the device and leave',
          next: 'scene17'
        }
      ]
    },
    scene60: {
      img: 'images/communication-repaired.jpg',
      text: `You manage to repair the communication system. A faint signal comes through, offering a potential escape route.`,
      choices: [
        {
          text: 'Follow the escape signal',
          next: 'scene63'
        },
        {
          text: 'Ignore the signal and continue exploring',
          next: 'scene17'
        }
      ]
    },
    scene61: {
      img: 'images/alien-device.jpg',
      text: `The alien device is clearly a key to something. You feel an urge to figure out what it opens.`,
      choices: [
        {
          text: 'Search for the door that the device opens',
          next: 'scene64'
        },
        {
          text: 'Leave the device and move on',
          next: 'scene17'
        }
      ]
    },
    scene62: {
      img: 'images/portal.jpg',
      text: `You step into the portal and are instantly transported to an alien landscape. This is unlike anything you’ve ever seen before.`,
      choices: [
        {
          text: 'Explore the new world',
          next: 'scene65'
        },
        {
          text: 'Return through the portal',
          next: 'scene17'
        }
      ]
    },
    scene63: {
      img: 'images/escape-route-found.jpg',
      text: `The signal leads you to an emergency escape pod. It’s your ticket out of here.`,
      choices: [
        {
          text: 'Enter the escape pod',
          next: 'scene66'
        },
        {
          text: 'Explore other parts of the ship',
          next: 'scene17'
        }
      ]
    },
    scene64: {
      img: 'images/alien-door.jpg',
      text: `You find the door that the device fits into. It opens with a mechanical hum, revealing a hidden chamber.`,
      choices: [
        {
          text: 'Enter the chamber',
          next: 'scene67'
        },
        {
          text: 'Leave the chamber and explore more',
          next: 'scene17'
        }
      ]
    },
    scene65: {
      img: 'images/alien-landscape.jpg',
      text: `You’re on an alien planet. Strange, towering structures surround you, and the sky is a strange shade of purple.`,
      choices: [
        {
          text: 'Search for life forms',
          next: 'scene68'
        },
        {
          text: 'Explore the surroundings',
          next: 'scene17'
        }
      ]
    },
    scene66: {
      img: 'images/escape-pod-launch.jpg',
      text: `You sit in the escape pod and prepare for launch. The countdown begins.`,
      choices: [
        {
          text: 'Launch the escape pod',
          next: 'endGame'
        }
      ]
    },
    scene67: {
      img: 'images/hidden-chamber.jpg',
      text: `Inside the chamber, you find a treasure trove of ancient alien artifacts. Some of them might have untold power.`,
      choices: [
        {
          text: 'Take an artifact',
          next: 'scene69',
          effect: () => {
            if (!gameState.inventory.includes('Alien Artifact')) {
              gameState.inventory.push('Alien Artifact');
            }
          }
        },
        {
          text: 'Leave the chamber and continue exploring',
          next: 'scene17'
        }
      ]
    },
    scene68: {
      img: 'images/alien-life.jpg',
      text: `You spot several alien creatures in the distance. They seem to be studying you.`,
      choices: [
        {
          text: 'Approach the aliens',
          next: 'scene70'
        },
        {
          text: 'Stay hidden and observe',
          next: 'scene17'
        }
      ]
    },
    scene69: {
      img: 'images/alien-treasure.jpg',
      text: `The artifact you picked up glows with power. It might be worth a lot if you can find someone who understands it.`,
      choices: [
        {
          text: 'Take the artifact and leave',
          next: 'scene17'
        },
        {
          text: 'Inspect the artifact further',
          next: 'scene71'
        }
      ]
    },
    scene70: {
      img: 'images/alien-contact.jpg',
      text: `You approach the aliens cautiously. Surprisingly, they don’t attack, instead they communicate telepathically.`,
      choices: [
        {
          text: 'Talk to the aliens',
          next: 'scene72'
        },
        {
          text: 'Retreat and explore elsewhere',
          next: 'scene17'
        }
      ]
    },
    scene71: {
      img: 'images/alien-artifact.jpg',
      text: `The artifact reveals symbols and a strange map. It might lead you to even more hidden treasures.`,
      choices: [
        {
          text: 'Follow the map',
          next: 'scene73'
        },
        {
          text: 'Store the artifact for later',
          next: 'scene17'
        }
      ]
    },
    scene72: {
      img: 'images/alien-telepathy.jpg',
      text: `The aliens offer you a deal: help them in exchange for safe passage off the planet.`,
      choices: [
        {
          text: 'Accept the offer',
          next: 'scene74'
        },
        {
          text: 'Reject the offer and leave',
          next: 'scene17'
        }
      ]
    },
    scene73: {
      img: 'images/alien-map.jpg',
      text: `The map leads you to a hidden base, far from where you started.`,
      choices: [
        {
          text: 'Go to the hidden base',
          next: 'scene75'
        },
        {
          text: 'Continue exploring other areas',
          next: 'scene17'
        }
      ]
    },
    scene74: {
      img: 'images/alien-deal.jpg',
      text: `You agree to help the aliens, and they lead you to a safe base where you can rest and plan your next move.`,
      choices: [
        {
          text: 'Rest at the alien base',
          next: 'scene76'
        },
        {
          text: 'Leave the base and continue on your own',
          next: 'scene17'
        }
      ]
    },
    scene75: {
      img: 'images/hidden-base.jpg',
      text: `You reach the hidden base, which seems abandoned, but there are signs that someone has been here recently.`,
      choices: [
        {
          text: 'Search the base for survivors',
          next: 'scene77'
        },
        {
          text: 'Look for clues to what happened here',
          next: 'scene78'
        }
      ]
    },
    scene76: {
      img: 'images/alien-rest.jpg',
      text: `You rest at the alien base, gaining back energy and preparing for what comes next.`,
      choices: [
        {
          text: 'Exit the base and continue exploring',
          next: 'scene17'
        }
      ]
    },
    scene77: {
      img: 'images/survivors.jpg',
      text: `You find signs of survivors, but they're nowhere to be found. It's unclear what happened to them.`,
      choices: [
        {
          text: 'Search for more clues',
          next: 'scene78'
        },
        {
          text: 'Leave the base and continue exploring',
          next: 'scene17'
        }
      ]
    },
    scene78: {
      img: 'images/clues.jpg',
      text: `The clues point to a secret project that was being conducted here. There’s mention of a weapon that could change the fate of the galaxy.`,
      choices: [
        {
          text: 'Investigate the secret project',
          next: 'scene79'
        },
        {
          text: 'Leave the base and continue exploring',
          next: 'scene17'
        }
      ]
    }
    
  };

  const scene = scenes[sceneId];
  if (!scene) {
    document.getElementById('narrative').innerHTML = `<p>Error: Scene not found.</p>`;
    return;
  }

  document.getElementById('narrative').innerHTML = `
    <img src="${scene.img}" alt="scene image">
    <p>${scene.text}</p>
  `;

  const choices = document.getElementById('choices');
  choices.innerHTML = '';
  scene.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.textContent = choice.text;
    if (choice.condition && !choice.condition()) {
      btn.disabled = true;
    } else {
      btn.onclick = () => showScene(choice.next || choice.success || choice.failure());
    }
    choices.appendChild(btn);
  });
}
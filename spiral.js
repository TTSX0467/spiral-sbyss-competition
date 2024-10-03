

// Buffs array for the Spiral Abyss
const buffs = ['Right Buff', 'Middle Buff', 'Left Buff'];

// Variables for the competition process
let banCount = 0;
let commonCharacterCount = 0;
let playerName = '';
let bannedCharacters = [];
let requiredCharacters = [];

// Utility function to display output in the browser
function outputText(text) {
    const outputElement = document.getElementById('output');
    outputElement.textContent += text + '\n';
}

// Function to generate random buffs for the Spiral Abyss
function generateBuffs() {
    function getRandomBuff() {
        return buffs[Math.floor(Math.random() * buffs.length)];
    }

    const buff12_1 = getRandomBuff();
    const buff12_2 = getRandomBuff();
    const buff12_3 = getRandomBuff();

    document.getElementById('buffs-output').textContent = `12-1: ${buff12_1}, 12-2: ${buff12_2}, 12-3: ${buff12_3}`;
    outputText(`\nBuffs for Floor 12:\n12-1: ${buff12_1}\n12-2: ${buff12_2}\n12-3: ${buff12_3}`);
}

// Function to randomly determine number of characters to ban and handle input
function chooseBans(callback) {
    banCount = Math.floor(Math.random() * 3); // Random number between 0-2

    if (banCount === 0) {
        outputText(`\nNo characters are banned for ${playerName}.`);
        return callback();
    }

    document.getElementById('ban-count-display').textContent = `Other players, please choose ${banCount} character(s) to ban for ${playerName}.`;
    
    let i = 0;
    const banInputField = document.getElementById('ban-input');
    const banSubmitButton = document.getElementById('submit-ban');

    banSubmitButton.addEventListener('click', function banHandler() {
        const character = banInputField.value.trim();
        if (character) {
            bannedCharacters.push(character);
            i++;
            if (i < banCount) {
                banInputField.value = ''; // Clear input
            } else {
                banInputField.value = '';
                banSubmitButton.removeEventListener('click', banHandler); // Remove event listener after bans
                callback();
            }
        }
    });
}

// Function to determine number of common characters and handle input
function chooseCommonCharacters(callback) {
    commonCharacterCount = Math.floor(Math.random() * 3); // Random number between 0-2

    if (commonCharacterCount === 0) {
        outputText(`\nNo common banner characters are needed for ${playerName}.`);
        return callback();
    }

    document.getElementById('common-count-display').textContent = `Please choose ${commonCharacterCount} common banner character(s) for ${playerName}.`;

    let i = 0;
    const commonInputField = document.getElementById('common-input');
    const commonSubmitButton = document.getElementById('submit-common');

    commonSubmitButton.addEventListener('click', function commonHandler() {
        const character = commonInputField.value.trim();
        if (character) {
            requiredCharacters.push(character);
            i++;
            if (i < commonCharacterCount) {
                commonInputField.value = ''; // Clear input
            } else {
                commonInputField.value = '';
                commonSubmitButton.removeEventListener('click', commonHandler); // Remove event listener after selection
                callback();
            }
        }
    });
}

// Main function to run the competition setup
function runCompetition() {
    // Step 1: Prompt for player name
    const nameInputField = document.getElementById('name-input');
    const nameSubmitButton = document.getElementById('submit-name');

    nameSubmitButton.addEventListener('click', () => {
        playerName = nameInputField.value.trim();
        if (playerName) {
            outputText(`\nPlayer Name: ${playerName}`);
            document.getElementById('name-section').style.display = 'none'; // Hide name section

            // Step 2: Choose bans
            document.getElementById('ban-section').style.display = 'block'; // Show ban section
            chooseBans(() => {
                outputText(`\nBanned Characters for ${playerName}: ${bannedCharacters.join(', ') || 'None'}`);
                document.getElementById('ban-section').style.display = 'none'; // Hide ban section

                // Step 3: Generate random buffs
                document.getElementById('buff-section').style.display = 'block'; // Show buffs
                generateBuffs();

                // Step 4: Choose common banner characters
                document.getElementById('common-character-section').style.display = 'block'; // Show common section
                chooseCommonCharacters(() => {
                    outputText(`\nCommon Banner Characters for ${playerName}: ${requiredCharacters.join(', ') || 'None'}`);
                    document.getElementById('common-character-section').style.display = 'none'; // Hide common section

                    // Final summary
                    outputText(`\nCompetition setup complete for ${playerName}!`);
                });
            });
        }
    });
}

// Run the competition setup when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    runCompetition();
});

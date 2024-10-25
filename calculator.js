// Wait for the DOM content to load before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Input elements for metric system
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');

    // Input elements for imperial system
    const heightFtInput = document.getElementById('height_ft');
    const heightInInput = document.getElementById('height_in');
    const weightStInput = document.getElementById('weight_st');
    const weightLbsInput = document.getElementById('weight_lbs');

    // Radio buttons for selecting metric or imperial units
    const metricRadio = document.getElementById('metric');
    const imperialRadio = document.getElementById('imperial');

    // Sections to show/hide based on unit selection
    const metricSystem = document.querySelector('.stats');
    const imperialSystem = document.querySelector('.stats_imperial');

    // Elements to display BMI results and messages
    const topBMI = document.getElementById('top_bmi');
    const resultElement = document.getElementById('result');
    const idealBMI = document.getElementById('ideal_bmi_info');
    const welcome = document.getElementById('welcome');
    const welcomeMore = document.getElementById('welcome_more');

    // Attach event listeners to metric system inputs
    heightInput.addEventListener('input', calculateBMI_Metric);
    weightInput.addEventListener('input', calculateBMI_Metric);

    // Attach event listeners to imperial system inputs
    heightFtInput.addEventListener('input', calculateBMI_Imperial);
    heightInInput.addEventListener('input', calculateBMI_Imperial);
    weightStInput.addEventListener('input', calculateBMI_Imperial);
    weightLbsInput.addEventListener('input', calculateBMI_Imperial);

    // Event listener for switching to metric system
    metricRadio.addEventListener('change', function () {
        if (metricRadio.checked) {
            metricSystem.style.display = 'flex';
            imperialSystem.style.display = 'none';
            resetDisplay();
        }
    });

    // Event listener for switching to imperial system
    imperialRadio.addEventListener('change', function () {
        if (imperialRadio.checked) {
            imperialSystem.style.display = 'grid';
            metricSystem.style.display = 'none';
            resetDisplay();
        }
    });

    // Resets display elements when switching between systems
    function resetDisplay() {
        welcome.style.display = "block";
        welcomeMore.style.display = "block";
        resultElement.innerText = "";
        topBMI.style.display = "none";
        idealBMI.style.display = "none";
    }

    // Calculates BMI using metric system values
    function calculateBMI_Metric() {
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);

        // Hide welcome messages and display result if inputs are valid
        welcome.style.display = "none";
        welcomeMore.style.display = "none";
        topBMI.style.display = "none";

        if (!isNaN(height) && !isNaN(weight)) {
            const meters = height / 100;
            const bmi = weight / (meters * meters);
            const minBMI = 18.5 * (meters * meters);
            const maxBMI = 24.9 * (meters * meters);

            // Update BMI result and ideal weight range
            resultElement.innerText = bmi.toFixed(1);
            idealBMI.innerText = bmi >= 18.5 && bmi <= 24.9 ?
                `Your BMI suggests you’re a healthy weight. Your ideal weight is between ${minBMI.toFixed(1)}kgs. - ${maxBMI.toFixed(1)}kgs.` :
                `Your BMI suggests you’re not a healthy weight. Your ideal weight is between ${minBMI.toFixed(1)}kgs. - ${maxBMI.toFixed(1)}kgs.`;

            topBMI.style.display = "block";
            idealBMI.style.display = "block";
        } else {
            resetDisplay();
        }
    }

    // Calculates BMI using imperial system values
    function calculateBMI_Imperial() {
        const heightFt = parseFloat(heightFtInput.value);
        const heightIn = parseFloat(heightInInput.value);
        const weightSt = parseFloat(weightStInput.value);
        const weightLbs = parseFloat(weightLbsInput.value);

        // Hide welcome messages and display result if inputs are valid
        welcome.style.display = "none";
        welcomeMore.style.display = "none";
        topBMI.style.display = "none";
        idealBMI.style.display = "none";

        if (!isNaN(heightFt) && !isNaN(heightIn) && !isNaN(weightSt) && !isNaN(weightLbs)) {
            const heightMeters = (heightFt * 30.48 + heightIn * 2.54) / 100;
            const weightKg = weightSt * 6.35 + weightLbs * 0.453592;
            const bmi = weightKg / (heightMeters * heightMeters);
            const minBMI = 18.5 * (heightMeters * heightMeters) / 6.35;
            const maxBMI = 24.9 * (heightMeters * heightMeters) / 6.35;

            // Update BMI result and ideal weight range
            resultElement.innerText = bmi.toFixed(1);
            idealBMI.innerText = bmi >= 18.5 && bmi <= 24.9 ?
                `Your BMI suggests you’re a healthy weight. Your ideal weight is between ${minBMI.toFixed(1)}st. - ${maxBMI.toFixed(1)}st.` :
                `Your BMI suggests you’re not a healthy weight. Your ideal weight is between ${minBMI.toFixed(1)}st. - ${maxBMI.toFixed(1)}st.`;

            topBMI.style.display = "block";
            idealBMI.style.display = "block";
        } else {
            resetDisplay();
        }
    }
});

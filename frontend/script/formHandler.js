import { validatePart3AutomatedRebalancing, validatePart3AckCheckBox } from './validations.js';
import { showDataInTable } from './tableHandler.js';
import { addAsset } from './assetManagement.js';

const getFormData = (id) => {
  const form = document.getElementById('portfolioForm');

  if (form) {
    const assetData = [];
    const assets = document.querySelectorAll('.assets');
    assets.forEach((asset) => {
      const assetClass = asset.querySelector('.assetClassDropdown');
      const percentageAllocation = asset.querySelector('.percentageAllocationInput');
      const specificFund = asset.querySelector('.specificFundInputAuto');
      const currentValue = asset.querySelector('.getCurrentValue');
      const data = {
        assetClass: assetClass?.value,
        percentageAllocation: percentageAllocation?.value,
        specificFund: specificFund?.value,
        currentValue: currentValue?.value,
      };

      assetData.push(data);
    });

    const investmentStyleCheckbox = document.querySelectorAll('input[name=investmentStyle]');
    const selectedinvestmentStyle = [];
    investmentStyleCheckbox.forEach((checkBox) => {
      if (checkBox.checked) {
        selectedinvestmentStyle.push(checkBox.value);
      }
    });

    const formData = {
      id,
      portfolioName: form.portfolioName.value.trim(),
      portfolioType: form.portfolioType.value,
      investmentGoal: form.investmentGoal.value,
      investmentHorizon: form.investmentHorizon.value,
      riskTolerance: form.riskTolerance.value,

      annualInvestmentCapacity: form.annualCapacityInput.value,
      lumpSumAmount: form.lumpSumAmount.value,
      monthlyContribution: form.monthlyContribution.value,
      assets: assetData,
      investmentStyle: selectedinvestmentStyle,

      automatedRebalancing: form.automatedRebalancing.value,
      taxSavingPrefernce: form.taxSavingPrefernce.value,
      financialGoals: form.financialGoals.value.trim(),
      riskAcknowledgement: form.riskAcknowledgement.value,
    };

    return formData;
  }
};

const submitValidation = () => {
  validatePart3AutomatedRebalancing();
  validatePart3AckCheckBox();

  // Submit
  let submit = validatePart3AutomatedRebalancing() && validatePart3AckCheckBox();

  return submit;
};

export const submitRecord = () => {
  if (submitValidation()) {
    const formData = getFormData(null);
    let localStorageDataString = localStorage.getItem('portfolioFormData');

    let localStorageData = localStorageDataString ? JSON.parse(localStorageDataString) : [];
    const nextId =
      localStorageData.length === 0 ? 1 : localStorageData[localStorageData.length - 1].id + 1;

    formData.id = nextId;
    localStorageData.push(formData);

    localStorageDataString = JSON.stringify(localStorageData);
    localStorage.setItem('portfolioFormData', localStorageDataString);

    showDataInTable();

    return true;
  }

  return false;
};

export const editRecord = () => {
  const formData = getFormData(selectedRowId);

  let localStorageDataString = localStorage.getItem('portfolioFormData');

  if (localStorageDataString) {
    const localStorageData = JSON.parse(localStorageDataString);
    const index = localStorageData.findIndex((record) => record.id === selectedRowId);

    if (index != -1) {
      localStorageData[index] = formData;
    }

    localStorageDataString = JSON.stringify(localStorageData);
    localStorage.setItem('portfolioFormData', localStorageDataString);

    showDataInTable();
    emptyFields();
    const riskAckCheckbox = document.getElementById('riskAck');
    const riskAcknowledgementLabel = document.getElementById('riskAckLabelText');
    const submitButton = document.getElementById('submitButton');
    riskAckCheckbox.checked = false;
    riskAckCheckbox.disabled = false;
    riskAckCheckbox.classList.remove('disable');
    riskAcknowledgementLabel.classList.remove('disable');

    submitButton.innerText = 'Submit';

    return true;
  }
  return false;
};

// Remove a record (record is retrieved based on the Portfolio Name - Unique Field)
export const removeRecord = () => {
  if (!selectedRowId) {
    alert('Please select a row to delete!');
  }

  const localStorageDataString = localStorage.getItem('portfolioFormData');

  if (localStorageDataString) {
    const localStorageData = JSON.parse(localStorageDataString);

    const updatedLocalStorage = localStorageData.filter((record) => record.id !== selectedRowId);
    const updatedLocalStorageString = JSON.stringify(updatedLocalStorage);

    localStorage.setItem('portfolioFormData', updatedLocalStorageString);

    selectedRowId = null;

    showDataInTable();
  } else {
    console.log('NO SUCH RECORD EXISRS');
  }
};

// Edit a record (record is retrieved based on the Portfolio Name - Unique Field)
export const popupateForm = () => {
  if (!selectedRowId) {
    alert('Please select a row to edit!');
  }

  // Part-1
  const portfolioNameInput = document.getElementById('portfolioNameInput');
  const portfolioTypeRadio = document.getElementsByName('portfolioType');
  const investmentGoalSelect = document.getElementById('investmentGoal');
  const investmentHorizonSelect = document.getElementById('investmentHorizon');
  const riskToleranceRadio = document.getElementsByName('riskTolerance');

  // Part-2
  const annualInvestmentCapacityInput = document.getElementById('annualInvestmentCapacityInput');
  const lumpSumAmountInput = document.getElementById('lumpSumAmountInput');
  const monthlyContributionInput = document.getElementById('monthlyContributionInput');
  // assets
  const assetContainer = document.querySelector('.assetContainer');
  while (assetContainer.children.length > 1) {
    assetContainer.removeChild(assetContainer.lastElementChild);
  }
  const firstAsset = assetContainer.children[0];

  const assetClassDropdown = firstAsset.querySelector('.assetClassDropdown');
  if (assetClassDropdown) {
    assetClassDropdown.value = '';
  }
  const percentageAllocationInput = firstAsset.querySelector('.percentageAllocationInput');
  if (percentageAllocationInput) {
    percentageAllocationInput.value = '';
  }
  const specificFundInputAuto = firstAsset.querySelector('.specificFundInputAuto');
  if (specificFundInputAuto) {
    specificFundInputAuto.value = '';
  }
  const getCurrentValue = firstAsset.querySelector('.getCurrentValue');
  if (getCurrentValue) {
    getCurrentValue.value = '';
  }

  const investmentStyleCheckbox = document.getElementsByName('investmentStyle');

  // Part-3
  const automatedRebalancingRadio = document.getElementsByName('automatedRebalancing');
  const taxSavingPrefernceRadio = document.getElementsByName('taxSavingPrefernce');
  const financialGoalsInput = document.getElementById('financialGoalsInput');

  const riskAckCheckbox = document.getElementById('riskAck');
  const riskAcknowledgementLabel = document.getElementById('riskAckLabelText');

  // Get existing data from localStorage
  const localStorageDataString = localStorage.getItem('portfolioFormData');

  const submitButton = document.getElementById('submitButton');

  if (localStorageDataString) {
    const localStorageData = JSON.parse(localStorageDataString);

    const requiredRecordToEdit = localStorageData.filter((record) => record.id === selectedRowId);

    if (requiredRecordToEdit[0]) {
      // Fill the form to edit the record

      // Part-1
      portfolioNameInput.value = requiredRecordToEdit[0].portfolioName;

      portfolioTypeRadio.forEach((radio) => {
        if (radio.value == requiredRecordToEdit[0]?.portfolioType) {
          radio.checked = true;
        }
      });
      investmentGoalSelect.value = requiredRecordToEdit[0].investmentGoal;
      investmentHorizonSelect.value = requiredRecordToEdit[0].investmentHorizon;
      // Risk Tolerance
      riskToleranceRadio.forEach((radio) => {
        if (radio.value == requiredRecordToEdit[0]?.riskTolerance) {
          radio.checked = true;
        }
      });

      // Part-2
      annualInvestmentCapacityInput.value = requiredRecordToEdit[0].annualInvestmentCapacity;
      lumpSumAmountInput.value = requiredRecordToEdit[0].lumpSumAmount;
      monthlyContributionInput.value = requiredRecordToEdit[0].monthlyContribution;

      // assets
      const assetCount = requiredRecordToEdit[0].assets.length;
      for (let i = 0; i < assetCount - 1; i++) {
        addAsset();
      }

      for (let i = 0; i < assetCount; i++) {
        const assetRow = document.getElementById(`asset-${i}`);

        const assetClassSelect = assetRow.querySelector('.assetClassDropdown');
        const percentageAllocationInput = assetRow.querySelector('.percentageAllocationInput');
        const specificFundInput = assetRow.querySelector('.specificFundInputAuto');
        const currentValueInput = assetRow.querySelector('.getCurrentValue');

        if (
          assetClassSelect &&
          percentageAllocationInput &&
          specificFundInput &&
          currentValueInput
        ) {
          assetClassSelect.value = requiredRecordToEdit[0].assets[i].assetClass ?? '';
          percentageAllocationInput.value =
            requiredRecordToEdit[0].assets[i].percentageAllocation ?? '';
          specificFundInput.value = requiredRecordToEdit[0].assets[i].specificFund ?? '';
          currentValueInput.value = requiredRecordToEdit[0].assets[i].currentValue ?? '';
        }
      }

      investmentStyleCheckbox.forEach((option) => {
        if (requiredRecordToEdit[0]?.investmentStyle.includes(option.value)) {
          option.checked = true;
        }
      });

      // Part-3
      automatedRebalancingRadio.forEach((radio) => {
        if (radio.value == requiredRecordToEdit[0]?.automatedRebalancing) {
          radio.checked = true;
        }
      });
      taxSavingPrefernceRadio.forEach((radio) => {
        if (radio.value == requiredRecordToEdit[0]?.taxSavingPrefernce) {
          radio.checked = true;
        }
      });
      financialGoalsInput.value = requiredRecordToEdit[0].financialGoals;
      riskAckCheckbox.checked = true;
      riskAckCheckbox.disabled = true;
      riskAckCheckbox.classList.add('disable');
      riskAcknowledgementLabel.classList.add('disable');

      submitButton.innerText = 'Update';
    }
  }
};

// empty fields after submission
export const emptyFields = () => {
  // Part-1
  const portfolioName = document.getElementById('portfolioNameInput');
  portfolioName.value = '';

  const portfolioTypeRadio = document.getElementsByName('portfolioType');
  portfolioTypeRadio.forEach((radio) => {
    if (radio.checked == true) {
      radio.checked = false;
    }
  });

  const investmentGoal = document.getElementById('investmentGoal');
  investmentGoal.value = '';

  const investmentHorizon = document.getElementById('investmentHorizon');
  investmentHorizon.value = '';

  const riskToleranceRadio = document.getElementsByName('riskTolerance');
  riskToleranceRadio.forEach((radio) => {
    if (radio.checked == true) {
      radio.checked = false;
    }
  });

  // Part-2
  const annualInvestmentCapacityInput = document.getElementById('annualInvestmentCapacityInput');
  annualInvestmentCapacityInput.value = '';

  const lumpSumAmountInput = document.getElementById('lumpSumAmountInput');
  lumpSumAmountInput.value = '';

  const monthlyContributionInput = document.getElementById('monthlyContributionInput');
  monthlyContributionInput.value = '';

  const assetContainer = document.querySelector('.assetContainer');
  while (assetContainer.children.length > 1) {
    assetContainer.removeChild(assetContainer.lastElementChild);
  }
  const firstAsset = assetContainer.children[0];
  firstAsset.querySelector('.assetClassDropdown').value = '';
  firstAsset.querySelector('.percentageAllocationInput').value = '';
  firstAsset.querySelector('.specificFundInputAuto').value = '';
  firstAsset.querySelector('.getCurrentValue').value = '';

  const investmentStyleCheckbox = document.getElementsByName('investmentStyle');
  investmentStyleCheckbox.forEach((checkbox) => {
    if (checkbox.checked == true) {
      checkbox.checked = false;
    }
  });

  // Part-3
  const automatedRebalancingRadio = document.getElementsByName('automatedRebalancing');
  automatedRebalancingRadio.forEach((radio) => {
    if (radio.checked == true) {
      radio.checked = false;
    }
  });
  const taxSavingPrefernceRadio = document.getElementsByName('taxSavingPrefernce');
  taxSavingPrefernceRadio.forEach((radio) => {
    if (radio.checked == true) {
      radio.checked = false;
    }
  });

  const financialGoals = document.getElementById('financialGoalsInput');
  financialGoals.value = '';

  const riskAckCheckbox = document.getElementsByName('riskAcknowledgement');
  riskAckCheckbox.forEach((checkbox) => {
    if (checkbox.checked == true) {
      checkbox.checked = false;
    }
  });
};

let selectedRowId = null;
export const selectRow = (id) => {
  selectedRowId = id ? Number(id) : null;
};

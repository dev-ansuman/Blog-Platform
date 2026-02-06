import {
  validatePart1PortfolioName,
  validatePart1PortfolioType,
  validatePart1InvestmentGoal,
  validatePart1InvestmentHorizon,
  validatePart1RiskTolerance,
  validatePart2AnnualInvestmentCapacity,
  validatePart2AssetClass,
  validatePart2percentageAllocation,
  validatePart3AutomatedRebalancing,
  validatePart3AckCheckBox,
  getSelectedRecordID,
  nameTaken,
} from './validations.js';

import { showDataInTable } from './tableHandler.js';
import {
  submitRecord,
  editRecord,
  emptyFields,
  popupateForm,
  removeRecord,
  selectRow,
} from './formHandler.js';
import { nextPage, previousPage } from './navigation.js';
import { addAsset, removeAsset, autoSuggestSpecificFund } from './assetManagement.js';

// Real Time Validation
// Part-1
const portfolioNameInput = document.getElementById('portfolioNameInput');
portfolioNameInput?.addEventListener('input', () => {
  validatePart1PortfolioName();
});
portfolioNameInput?.addEventListener('focusout', () => {
  nameTaken();
});

const portfolioType = document.getElementsByName('portfolioType');
portfolioType.forEach((portfolio) => {
  portfolio.addEventListener('change', () => {
    validatePart1PortfolioType();
  });
});

const riskTolerance = document.getElementsByName('riskTolerance');
riskTolerance.forEach((risk) => {
  risk.addEventListener('change', () => {
    validatePart1RiskTolerance();
  });
});

const investmentGoal = document.getElementById('investmentGoal');
investmentGoal?.addEventListener('change', () => {
  validatePart1InvestmentGoal();
});

const investmentHorizon = document.getElementById('investmentHorizon');
investmentHorizon?.addEventListener('change', () => {
  validatePart1InvestmentHorizon();
});

// Part-2
const annualInvestmentCapacityInput = document.getElementById('annualInvestmentCapacityInput');
annualInvestmentCapacityInput?.addEventListener('input', () => {
  validatePart2AnnualInvestmentCapacity();
});

const assetContainer = document.querySelector('.assetContainer');

assetContainer?.addEventListener('change', (event) => {
  const target = event.target;
  if (target.classList.contains('assetClassDropdown')) {
    validatePart2AssetClass();
    autoSuggestSpecificFund('.assetClassDropdown', '.specificFundInputAuto');
  }
});
assetContainer?.addEventListener('input', (event) => {
  const target = event.target;
  if (target.classList.contains('percentageAllocationInput')) {
    validatePart2percentageAllocation();
  }
});

// Part-3
const automatedRebalancing = document.getElementsByName('automatedRebalancing');
automatedRebalancing.forEach((option) => {
  option.addEventListener('change', () => {
    validatePart3AutomatedRebalancing();
  });
});

const riskAcknowledgement = document.getElementsByName('riskAcknowledgement');
riskAcknowledgement.forEach((option) => {
  option.addEventListener('change', () => {
    validatePart3AckCheckBox();
  });
});

// Navigation
const forward = document.getElementById('forward');
forward?.addEventListener('click', () => {
  nextPage();
});

const previousButton = document.getElementById('prevButton');
previousButton?.addEventListener('click', () => {
  previousPage();
});

// Asset Management
const addAssetButton = document.getElementById('addAssetButton');
addAssetButton?.addEventListener('click', () => {
  addAsset();
});

document.body.addEventListener('click', (event) => {
  const target = event.target;
  if (target.matches('.removeAssetButton')) {
    const assetId = target.id;
    removeAsset(`asset-${assetId}`);
  }
});

const portfolioForm = document.getElementById('portfolioForm');
portfolioForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const submitButton = document.getElementById('submitButton');
  let success = false;

  if (submitButton.innerText == 'Update') {
    success = editRecord();
  } else {
    success = submitRecord();
  }

  if (success) {
    emptyFields();
    previousPage();
    previousPage();
  }
});

showDataInTable();

// edit button
const editButton = document.getElementById('editRecordButton');
const deleteButton = document.getElementById('deleteRecordButton');

editButton?.addEventListener('click', () => {
  popupateForm();
});

deleteButton?.addEventListener('click', () => {
  removeRecord();
});

const formTable = document.getElementById('formTable');
formTable?.addEventListener('click', (event) => {
  const target = event.target;
  const row = target.closest('tr');
  const tbody = document.getElementById('tableBody');

  // if(!row || !tableBody || row.parentElement !== tbody) return

  if (row.classList.contains('selectedRecord')) {
    row.classList.remove('selectedRecord');
    selectRow(null);
    getSelectedRecordID(null);
  } else {
    tbody
      ?.querySelectorAll('tr.selectedRecord')
      .forEach((record) => record.classList.remove('selectedRecord'));
    row.classList.add('selectedRecord');
    selectRow(Number(row.dataset.id));
    getSelectedRecordID(Number(row.dataset.id));
  }
});

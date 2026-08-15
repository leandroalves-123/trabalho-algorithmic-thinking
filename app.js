/**
 * R.M Imobiliária - Rental Budget Simulator JavaScript Lógica
 * Author: Antigravity Code Assistant
 * Date: 2026-08-15
 */

document.addEventListener('DOMContentLoaded', () => {
    // STATE
    const state = {
        propertyType: 'apartment', // 'apartment' | 'house' | 'studio'
        bedrooms: 1,               // 1 | 2
        garage: false,             // true | false (for apartment/house)
        hasChildren: 'yes',        // 'yes' | 'no' (for apartment discount)
        studioParking: 0,          // 0+ (for studio)
        contractInstallments: 5    // 1 to 5
    };

    // DOM ELEMENTS
    const dom = {
        // Property cards
        cards: {
            apartment: document.getElementById('card-apartment'),
            house: document.getElementById('card-house'),
            studio: document.getElementById('card-studio')
        },
        // Config fields (containers)
        fields: {
            bedrooms: document.getElementById('field-bedrooms'),
            garage: document.getElementById('field-garage'),
            children: document.getElementById('field-children'),
            studioParking: document.getElementById('field-studio-parking')
        },
        // Input controls
        inputs: {
            bedroomsGroup: document.getElementById('bedrooms-btn-group'),
            garageCheckbox: document.getElementById('garage-checkbox'),
            childrenGroup: document.getElementById('children-btn-group'),
            parkingInput: document.getElementById('studio-parking-input'),
            btnParkingMinus: document.getElementById('btn-parking-minus'),
            btnParkingPlus: document.getElementById('btn-parking-plus'),
            installmentsRange: document.getElementById('installments-range')
        },
        // Dynamic price indicators (inside config panel)
        indicators: {
            bedroomsPrice: document.getElementById('bedrooms-price-indicator'),
            childrenDiscount: document.getElementById('children-price-indicator'),
            parkingPrice: document.getElementById('parking-price-indicator'),
            installmentsVal: document.getElementById('installments-val-display'),
            contractPreview: document.getElementById('contract-installment-calc')
        },
        // Summary outputs
        summary: {
            propertyType: document.getElementById('summary-property-type'),
            basePrice: document.getElementById('summary-base-price'),
            rowBedrooms: document.getElementById('summary-row-bedrooms'),
            bedroomsPrice: document.getElementById('summary-bedrooms-price'),
            rowGarage: document.getElementById('summary-row-garage'),
            garagePrice: document.getElementById('summary-garage-price'),
            rowDiscount: document.getElementById('summary-row-discount'),
            discountPrice: document.getElementById('summary-discount-price'),
            monthlyRent: document.getElementById('summary-monthly-rent'),
            contractInstallment: document.getElementById('summary-contract-installment')
        },
        // Banners and lists
        banner: {
            monthsCount: document.getElementById('banner-months-count'),
            grandTotal: document.getElementById('banner-grand-total'),
            reducedRent: document.getElementById('banner-reduced-rent')
        },
        scheduleTableBody: document.querySelector('#schedule-table tbody'),
        // Buttons
        btnDownloadCsv: document.getElementById('btn-download-csv'),
        btnPrintQuote: document.getElementById('btn-print-quote'),
        // Toast
        toastContainer: document.getElementById('toast-container')
    };

    // BUSINESS LOGIC CONSTANTS
    const CONSTANTS = {
        CONTRACT_TOTAL: 2000.00,
        PRICES: {
            apartment: { base: 700.00, extraBed: 200.00, garage: 300.00 },
            house: { base: 900.00, extraBed: 250.00, garage: 300.00 },
            studio: { base: 1200.00 }
        }
    };

    // INITIALIZATION
    init();

    function init() {
        setupEventListeners();
        calculateAndUpdate();
    }

    // EVENT LISTENERS Setup
    function setupEventListeners() {
        // Property card selectors
        Object.keys(dom.cards).forEach(type => {
            dom.cards[type].addEventListener('click', () => {
                selectPropertyType(type);
            });
            // Support space / enter for accessibility
            dom.cards[type].addEventListener('keydown', (e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    selectPropertyType(type);
                }
            });
        });

        // Bedrooms buttons toggle
        const bedroomButtons = dom.inputs.bedroomsGroup.querySelectorAll('.btn-toggle');
        bedroomButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                bedroomButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.bedrooms = parseInt(btn.dataset.value, 10);
                calculateAndUpdate();
            });
        });

        // Garage Checkbox
        dom.inputs.garageCheckbox.addEventListener('change', (e) => {
            state.garage = e.target.checked;
            calculateAndUpdate();
        });

        // Children buttons toggle
        const childrenButtons = dom.inputs.childrenGroup.querySelectorAll('.btn-toggle');
        childrenButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                childrenButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.hasChildren = btn.dataset.value;
                calculateAndUpdate();
            });
        });

        // Studio parking stepper
        dom.inputs.btnParkingMinus.addEventListener('click', () => {
            if (state.studioParking > 0) {
                state.studioParking--;
                dom.inputs.parkingInput.value = state.studioParking;
                calculateAndUpdate();
            }
        });

        dom.inputs.btnParkingPlus.addEventListener('click', () => {
            if (state.studioParking < 10) { // arbitrary max of 10 spaces
                state.studioParking++;
                dom.inputs.parkingInput.value = state.studioParking;
                calculateAndUpdate();
            }
        });

        // Contract installment slider
        dom.inputs.installmentsRange.addEventListener('input', (e) => {
            state.contractInstallments = parseInt(e.target.value, 10);
            calculateAndUpdate();
        });

        // CSV Export button
        dom.btnDownloadCsv.addEventListener('click', downloadCSV);

        // Print button
        dom.btnPrintQuote.addEventListener('click', () => {
            window.print();
        });
    }

    // SELECT PROPERTY TYPE ACTIONS
    function selectPropertyType(type) {
        state.propertyType = type;
        
        // Visual Card Activation
        Object.keys(dom.cards).forEach(t => {
            dom.cards[t].classList.toggle('active', t === type);
        });

        // Adjust form visibility depending on selected type
        if (type === 'apartment') {
            dom.fields.bedrooms.classList.remove('hidden');
            dom.fields.garage.classList.remove('hidden');
            dom.fields.children.classList.remove('hidden');
            dom.fields.studioParking.classList.add('hidden');
        } else if (type === 'house') {
            dom.fields.bedrooms.classList.remove('hidden');
            dom.fields.garage.classList.remove('hidden');
            dom.fields.children.classList.add('hidden');
            dom.fields.studioParking.classList.add('hidden');
        } else if (type === 'studio') {
            dom.fields.bedrooms.classList.add('hidden');
            dom.fields.garage.classList.add('hidden');
            dom.fields.children.classList.add('hidden');
            dom.fields.studioParking.classList.remove('hidden');
        }

        calculateAndUpdate();
    }

    // MAIN CALCULATIONS
    function calculateAndUpdate() {
        const type = state.propertyType;
        const prices = CONSTANTS.PRICES[type];
        
        // Base Rent
        let baseRent = prices.base;
        let bedroomAddon = 0.00;
        let garageAddon = 0.00;
        let discount = 0.00;
        let monthlyRent = 0.00;

        // Reset details
        let bedroomLabel = "";
        let garageLabel = "";

        if (type === 'apartment' || type === 'house') {
            // Bedrooms calculation
            if (state.bedrooms === 2) {
                bedroomAddon = prices.extraBed;
                bedroomLabel = '2 Quartos';
            } else {
                bedroomLabel = '1 Quarto';
            }

            // Garage calculation
            if (state.garage) {
                garageAddon = prices.garage;
                garageLabel = 'Com Vaga';
            } else {
                garageLabel = 'Sem Vaga';
            }

            // Sum values for rent
            const rentSubtotal = baseRent + bedroomAddon + garageAddon;

            // Discount: 5% for Apartment without kids
            if (type === 'apartment' && state.hasChildren === 'no') {
                discount = rentSubtotal * 0.05;
            }

            monthlyRent = rentSubtotal - discount;

            // Update configuration panel badge prices
            dom.indicators.bedroomsPrice.innerHTML = `<span class="badge">+ ${formatCurrency(prices.extraBed)} se 2 Quartos</span>`;
            
            // Highlight active bedrooms option value in subtext / indicators
            const extraBedActiveText = state.bedrooms === 2 ? `Incluído (${formatCurrency(prices.extraBed)})` : 'Valor Padrão (Sem adicional)';
            dom.indicators.bedroomsPrice.querySelector('.badge').textContent = extraBedActiveText;
            dom.indicators.bedroomsPrice.querySelector('.badge').classList.toggle('badge-success', state.bedrooms === 2);
            
            // Adjust child discount indicator state
            if (type === 'apartment') {
                if (state.hasChildren === 'no') {
                    dom.indicators.childrenDiscount.innerHTML = `<span class="badge badge-success">Desconto Ativo: -5% (${formatCurrency(discount)})</span>`;
                } else {
                    dom.indicators.childrenDiscount.innerHTML = `<span class="badge">Elegível para -5% (se não tiver crianças)</span>`;
                }
            }

        } else if (type === 'studio') {
            // Studio Parking:
            // "vagas de estacionamento no valor de R$ 250,00 com 2 (duas) vagas, podendo acrescentar mais vagas no valor de R$ 60,00 cada"
            const spaces = state.studioParking;
            if (spaces > 0) {
                if (spaces <= 2) {
                    garageAddon = 250.00;
                } else {
                    garageAddon = 250.00 + (spaces - 2) * 60.00;
                }
                garageLabel = `${spaces} Vaga(s)`;
            } else {
                garageAddon = 0.00;
                garageLabel = 'Sem Vagas';
            }

            monthlyRent = baseRent + garageAddon;

            // Update Studio Parking badge indicator
            let parkingText = 'Nenhuma vaga incluída';
            if (spaces > 0) {
                parkingText = `Custo Vagas: ${formatCurrency(garageAddon)}`;
            }
            dom.indicators.parkingPrice.innerHTML = `<span class="badge ${spaces > 0 ? 'badge-success' : ''}">${parkingText}</span>`;
        }

        // Contract installment calculation
        const instCount = state.contractInstallments;
        const monthlyContractInstallment = CONSTANTS.CONTRACT_TOTAL / instCount;

        // Render inputs current state values
        dom.indicators.installmentsVal.textContent = `${instCount}x`;
        dom.indicators.contractPreview.textContent = `${instCount} parcelas de ${formatCurrency(monthlyContractInstallment)}`;

        // UPDATE RESUMO CARD
        dom.summary.propertyType.textContent = type === 'apartment' ? 'Apartamento' : type === 'house' ? 'Casa' : 'Estúdio';
        dom.summary.basePrice.textContent = formatCurrency(baseRent);

        // Show/Hide bedrooms row in summary
        if (type !== 'studio' && state.bedrooms === 2) {
            dom.summary.rowBedrooms.style.display = 'flex';
            dom.summary.bedroomsPrice.textContent = formatCurrency(bedroomAddon);
        } else {
            dom.summary.rowBedrooms.style.display = 'none';
        }

        // Show/Hide garage row in summary
        if ((type !== 'studio' && state.garage) || (type === 'studio' && state.studioParking > 0)) {
            dom.summary.rowGarage.style.display = 'flex';
            dom.summary.rowGarage.querySelector('span:first-child').textContent = type === 'studio' ? `Vagas Estacionamento (${state.studioParking}x)` : 'Vaga de Garagem';
            dom.summary.garagePrice.textContent = formatCurrency(garageAddon);
        } else {
            dom.summary.rowGarage.style.display = 'none';
        }

        // Show/Hide discount row in summary (only for apartment with no kids)
        if (type === 'apartment' && state.hasChildren === 'no') {
            dom.summary.rowDiscount.style.display = 'flex';
            dom.summary.discountPrice.textContent = `- ${formatCurrency(discount)}`;
        } else {
            dom.summary.rowDiscount.style.display = 'none';
        }

        // Update totals in summary card
        dom.summary.monthlyRent.textContent = formatCurrency(monthlyRent);
        dom.summary.contractInstallment.textContent = `${formatCurrency(monthlyContractInstallment)} /mês`;

        // Banner totals (Installment Phase vs Reduced Phase)
        dom.banner.monthsCount.textContent = instCount;
        dom.banner.grandTotal.innerHTML = `${formatCurrency(monthlyRent + monthlyContractInstallment)} <small>/mês</small>`;
        dom.banner.reducedRent.textContent = formatCurrency(monthlyRent);

        // GENERATE 12-MONTH TABLE
        generateScheduleTable(monthlyRent, instCount, monthlyContractInstallment);
    }

    // GENERATE THE 12-MONTH SCHEDULE TABLE
    function generateScheduleTable(monthlyRent, instCount, instValue) {
        dom.scheduleTableBody.innerHTML = '';
        
        for (let month = 1; month <= 12; month++) {
            // Contract payment applies only to months <= instCount
            const contractPayment = month <= instCount ? instValue : 0.00;
            const totalMonthly = monthlyRent + contractPayment;

            const tr = document.createElement('tr');
            
            // Format Month row
            tr.innerHTML = `
                <td>Mês ${month}</td>
                <td>${formatCurrency(monthlyRent)}</td>
                <td>${contractPayment > 0 ? formatCurrency(contractPayment) : '—'}</td>
                <td>${formatCurrency(totalMonthly)}</td>
            `;
            
            dom.scheduleTableBody.appendChild(tr);
        }
    }

    // CSV GENERATION AND EXPORT
    function downloadCSV() {
        const type = state.propertyType;
        const prices = CONSTANTS.PRICES[type];
        
        let baseRent = prices.base;
        let bedroomAddon = 0.00;
        let garageAddon = 0.00;
        let discount = 0.00;
        let monthlyRent = 0.00;

        // Recalculating exact details for clean CSV generation
        if (type === 'apartment' || type === 'house') {
            if (state.bedrooms === 2) bedroomAddon = prices.extraBed;
            if (state.garage) garageAddon = prices.garage;
            const rentSubtotal = baseRent + bedroomAddon + garageAddon;
            if (type === 'apartment' && state.hasChildren === 'no') {
                discount = rentSubtotal * 0.05;
            }
            monthlyRent = rentSubtotal - discount;
        } else if (type === 'studio') {
            const spaces = state.studioParking;
            if (spaces > 0) {
                garageAddon = spaces <= 2 ? 250.00 : 250.00 + (spaces - 2) * 60.00;
            }
            monthlyRent = baseRent + garageAddon;
        }

        const instCount = state.contractInstallments;
        const instValue = CONSTANTS.CONTRACT_TOTAL / instCount;

        // Build CSV Content
        // We use ';' separator and UTF-8 with BOM (\uFEFF) for optimal Portuguese MS Excel compatibility
        let csvContent = '\uFEFF';
        
        // Header info metadata
        csvContent += `R.M IMOBILIÁRIA - SIMULADOR DE ORÇAMENTO DE LOCAÇÃO\n`;
        csvContent += `Data de Geração:;${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}\n`;
        csvContent += `Imóvel Selecionado:;${type.toUpperCase()}\n`;
        
        if (type !== 'studio') {
            csvContent += `Quartos:;${state.bedrooms} quarto(s)\n`;
            csvContent += `Vaga de Garagem:;${state.garage ? 'Sim' : 'Não'}\n`;
            if (type === 'apartment') {
                csvContent += `Possui Crianças:;${state.hasChildren === 'yes' ? 'Sim' : 'Não (5% desconto)'}\n`;
            }
        } else {
            csvContent += `Vagas de Estacionamento:;${state.studioParking} vaga(s)\n`;
        }
        
        csvContent += `Parcelamento do Contrato:;${instCount}x de ${formatCurrencyCSV(instValue)}\n`;
        csvContent += `\n`;
        
        // Table Columns
        csvContent += `Mês;Valor do Aluguel (R$);Parcela do Contrato (R$);Total Mensal (R$)\n`;

        // Monthly lines
        let totalPaidInYear = 0;
        for (let month = 1; month <= 12; month++) {
            const contractPayment = month <= instCount ? instValue : 0.00;
            const totalMonthly = monthlyRent + contractPayment;
            totalPaidInYear += totalMonthly;

            csvContent += `Mês ${month};${formatCSVNumber(monthlyRent)};${formatCSVNumber(contractPayment)};${formatCSVNumber(totalMonthly)}\n`;
        }

        // Summary footer
        csvContent += `\n`;
        csvContent += `TOTAL PAGO EM 12 MESES:;;;${formatCurrencyCSV(totalPaidInYear)}\n`;

        // Download trigger
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        // Filename format: Orcamento_RM_Apartamento_2026-08-15.csv
        const typeStr = type.charAt(0).toUpperCase() + type.slice(1);
        const dateStr = new Date().toISOString().split('T')[0];
        
        link.setAttribute('href', url);
        link.setAttribute('download', `Orcamento_RM_${typeStr}_${dateStr}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast('Orçamento CSV baixado com sucesso!', 'success');
    }

    // HELPER FUNCTIONS
    function formatCurrency(val) {
        return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function formatCurrencyCSV(val) {
        return `R$ ${val.toFixed(2).replace('.', ',')}`;
    }

    function formatCSVNumber(val) {
        // Formats numbers with decimal comma for Excel in Portuguese
        return val.toFixed(2).replace('.', ',');
    }

    // TOAST NOTIFICATIONS
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-info';
        
        toast.innerHTML = `
            <i class="fa-solid ${icon}"></i>
            <span class="toast-message">${message}</span>
        `;
        
        dom.toastContainer.appendChild(toast);
        
        // Animate out and remove after 3.5 seconds
        setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s reverse forwards';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3200);
    }
});

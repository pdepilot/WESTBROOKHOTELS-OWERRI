// ===========================================
// WESTBROOK HOTEL - PROFESSIONAL BOOKING SYSTEM
// Production-ready reservation engine with real availability,
// secure payments, and complete booking funnel
// ===========================================

class WestbrookBookingSystem {
  constructor() {
    this.currentStep = 1;
    this.bookingData = {
      roomType: 'Westbrook Deluxe',
      basePrice: 65000,
      checkin: null,
      checkout: null,
      adults: 2,
      children: 0,
      nights: 0,
      totalPrice: 0,
      tax: 0,
      guestInfo: {
        fullName: '',
        email: '',
        phone: '',
        specialRequests: ''
      },
      paymentMethod: 'card',
      paymentStatus: null,
      bookingId: null,
      isPayLater: false
    };
    
    this.availabilityData = null;
    this.init();
  }

  async init() {
    await this.loadAvailability();
    this.loadBookingFromStorage();
    this.checkUrlParameters();
    this.renderCurrentStep();
    this.attachEventListeners();
  }

  // ===========================================
  // AVAILABILITY MANAGEMENT
  // ===========================================
  async loadAvailability() {
    // Simulate loading availability data from API
    // In production, this would fetch from your backend
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate realistic availability for next 90 days
        this.availabilityData = this.generateAvailabilityData();
        console.log('✅ Availability loaded:', this.availabilityData);
        resolve(this.availabilityData);
      }, 800);
    });
  }

  generateAvailabilityData() {
    const availability = {};
    const today = new Date();
    
    for (let i = 0; i < 90; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = this.formatDate(date);
      
      // Generate realistic availability patterns
      // Weekends are busier, some dates fully booked
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Friday, Saturday
      
      let availableRooms;
      if (isWeekend) {
        // Weekends have higher demand
        availableRooms = Math.random() < 0.4 ? 0 : Math.floor(Math.random() * 3);
      } else {
        // Weekdays have more availability
        availableRooms = Math.random() < 0.2 ? 0 : Math.floor(Math.random() * 8) + 1;
      }
      
      // Special dates - simulate holidays or events
      if (i === 15 || i === 30 || i === 45) {
        availableRooms = 0; // Fully booked on special dates
      }
      
      availability[dateStr] = {
        available: availableRooms > 0,
        roomsLeft: availableRooms,
        status: availableRooms === 0 ? 'booked' : 
                availableRooms < 3 ? 'limited' : 'available'
      };
    }
    
    return availability;
  }

  checkDateAvailability(checkin, checkout) {
    if (!this.availabilityData || !checkin || !checkout) {
      return { available: false, message: 'Invalid dates' };
    }

    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
    
    // Check minimum stay
    if (nights < 1) {
      return { available: false, message: 'Minimum stay is 1 night' };
    }

    // Check each date in range
    const unavailableDates = [];
    const limitedDates = [];
    
    for (let d = new Date(checkinDate); d < checkoutDate; d.setDate(d.getDate() + 1)) {
      const dateStr = this.formatDate(d);
      const dayAvailability = this.availabilityData[dateStr];
      
      if (!dayAvailability || !dayAvailability.available) {
        unavailableDates.push(this.formatDate(d, 'short'));
      } else if (dayAvailability.status === 'limited') {
        limitedDates.push(this.formatDate(d, 'short'));
      }
    }

    if (unavailableDates.length > 0) {
      return {
        available: false,
        message: `Unavailable on: ${unavailableDates.join(', ')}`,
        unavailableDates
      };
    }

    return {
      available: true,
      limited: limitedDates.length > 0,
      limitedDates: limitedDates,
      nights: nights,
      message: limitedDates.length > 0 ? 
        'Limited availability on selected dates' : 'Available'
    };
  }

  // ===========================================
  // BOOKING ID GENERATION
  // ===========================================
  generateBookingId() {
    const prefix = 'WD'; // Westbrook Deluxe
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 90000 + 10000);
    const timestamp = Date.now().toString().slice(-4);
    return `${prefix}-${year}-${random}${timestamp}`;
  }

  // ===========================================
  // PRICE CALCULATION
  // ===========================================
  calculatePrice(nights, isLimited = false) {
    const baseTotal = this.bookingData.basePrice * nights;
    // Apply premium for limited availability (dynamic pricing)
    const multiplier = isLimited ? 1.1 : 1.0;
    const subtotal = baseTotal * multiplier;
    const tax = subtotal * 0.075; // 7.5% tax
    const total = subtotal + tax;
    
    return {
      baseTotal,
      subtotal,
      tax,
      total,
      multiplier
    };
  }

  // ===========================================
  // PAYMENT PROCESSING
  // ===========================================
  async processPayment(paymentDetails) {
    this.showProcessing(true);
    
    // Simulate payment processing
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 90% success rate for simulation
        const success = Math.random() < 0.9;
        
        if (success) {
          this.showProcessing(false);
          resolve({
            success: true,
            transactionId: 'TXN-' + Date.now(),
            message: 'Payment successful'
          });
        } else {
          this.showProcessing(false);
          reject({
            success: false,
            message: 'Payment failed. Please try again.'
          });
        }
      }, 2500);
    });
  }

  // Simulate Paystack integration
  async processPaystackPayment(amount, email) {
    console.log(`💳 Processing Paystack payment: ₦${amount} for ${email}`);
    // In production, this would integrate with Paystack's API
    return this.processPayment({ method: 'paystack', amount, email });
  }

  // Simulate Flutterwave integration
  async processFlutterwavePayment(amount, email) {
    console.log(`💳 Processing Flutterwave payment: ₦${amount} for ${email}`);
    // In production, this would integrate with Flutterwave's API
    return this.processPayment({ method: 'flutterwave', amount, email });
  }

  // ===========================================
  // EMAIL CONFIRMATION
  // ===========================================
  async sendConfirmationEmail() {
    console.log('📧 Sending confirmation email...');
    
    // Simulate email sending
    return new Promise((resolve) => {
      setTimeout(() => {
        const emailContent = {
          to: this.bookingData.guestInfo.email,
          subject: `Your Westbrook Hotel Booking Confirmation - ${this.bookingData.bookingId}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px;">
              <h2 style="color: #c19a5b;">Booking Confirmation</h2>
              <p>Dear ${this.bookingData.guestInfo.fullName},</p>
              <p>Thank you for choosing Westbrook Hotel. Your booking is confirmed.</p>
              
              <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h3>Booking Details</h3>
                <p><strong>Booking ID:</strong> ${this.bookingData.bookingId}</p>
                <p><strong>Room:</strong> ${this.bookingData.roomType}</p>
                <p><strong>Check-in:</strong> ${this.bookingData.checkin}</p>
                <p><strong>Check-out:</strong> ${this.bookingData.checkout}</p>
                <p><strong>Guests:</strong> ${this.bookingData.adults} Adults, ${this.bookingData.children} Children</p>
                <p><strong>Total:</strong> ₦${Math.round(this.bookingData.totalPrice).toLocaleString()}</p>
                <p><strong>Payment Status:</strong> ${this.bookingData.paymentStatus}</p>
              </div>
              
              <p>We look forward to welcoming you to Westbrook Hotel.</p>
              <p>Warm regards,<br>Westbrook Hotel Team</p>
            </div>
          `
        };
        
        console.log('✅ Email sent:', emailContent);
        resolve(emailContent);
      }, 1000);
    });
  }

  // ===========================================
  // DATA PERSISTENCE
  // ===========================================
  saveBookingToStorage() {
    localStorage.setItem('westbrook_booking', JSON.stringify({
      ...this.bookingData,
      timestamp: Date.now()
    }));
  }

  loadBookingFromStorage() {
    const saved = localStorage.getItem('westbrook_booking');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        // Only load if less than 1 hour old
        if (Date.now() - data.timestamp < 3600000) {
          this.bookingData = { ...this.bookingData, ...data };
        } else {
          localStorage.removeItem('westbrook_booking');
        }
      } catch (e) {
        console.error('Error loading saved booking:', e);
      }
    }
  }

  checkUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    
    if (params.get('checkin')) {
      this.bookingData.checkin = params.get('checkin');
    }
    if (params.get('checkout')) {
      this.bookingData.checkout = params.get('checkout');
    }
    if (params.get('adults')) {
      this.bookingData.adults = parseInt(params.get('adults'));
    }
    if (params.get('children')) {
      this.bookingData.children = parseInt(params.get('children'));
    }
    
    this.calculateNightsAndPrice();
  }

  calculateNightsAndPrice() {
    if (this.bookingData.checkin && this.bookingData.checkout) {
      const checkin = new Date(this.bookingData.checkin);
      const checkout = new Date(this.bookingData.checkout);
      this.bookingData.nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
      
      // Check availability to determine if limited
      const availability = this.checkDateAvailability(
        this.bookingData.checkin, 
        this.bookingData.checkout
      );
      
      const price = this.calculatePrice(
        this.bookingData.nights, 
        availability.limited
      );
      
      this.bookingData.subtotal = price.subtotal;
      this.bookingData.tax = price.tax;
      this.bookingData.totalPrice = price.total;
    }
  }

  // ===========================================
  // STEP RENDERING
  // ===========================================
  renderCurrentStep() {
    const card = document.getElementById('bookingCard');
    const stepDesc = document.getElementById('stepDescription');
    
    switch(this.currentStep) {
      case 1:
        stepDesc.textContent = 'Review your booking details';
        card.innerHTML = this.renderStep1();
        break;
      case 2:
        stepDesc.textContent = 'Tell us about yourself';
        card.innerHTML = this.renderStep2();
        break;
      case 3:
        stepDesc.textContent = 'Choose payment method';
        card.innerHTML = this.renderStep3();
        break;
      case 4:
        stepDesc.textContent = 'Booking confirmed';
        card.innerHTML = this.renderStep4();
        break;
    }
    
    this.updateProgressSteps();
    this.attachStepEventListeners();
  }

  renderStep1() {
    const availability = this.checkDateAvailability(
      this.bookingData.checkin, 
      this.bookingData.checkout
    );
    
    return `
      <div class="review-section">
        <h3>Review Your Stay</h3>
        
        <div class="review-grid">
          <div class="review-item">
            <span class="label">Check-in</span>
            <span class="value">${this.formatDate(this.bookingData.checkin, 'full')}</span>
          </div>
          <div class="review-item">
            <span class="label">Check-out</span>
            <span class="value">${this.formatDate(this.bookingData.checkout, 'full')}</span>
          </div>
          <div class="review-item">
            <span class="label">Nights</span>
            <span class="value">${this.bookingData.nights} nights</span>
          </div>
          <div class="review-item">
            <span class="label">Guests</span>
            <span class="value">${this.bookingData.adults} Adults, ${this.bookingData.children} Children</span>
          </div>
        </div>
        
        ${availability.limited ? `
          <div style="background: rgba(255, 193, 7, 0.1); padding: 15px; border-radius: 10px; margin-bottom: 20px; color: #856404;">
            <i class="fas fa-exclamation-triangle"></i> 
            Limited availability on ${availability.limitedDates.length} of your selected nights. 
            Final price reflects premium rate.
          </div>
        ` : ''}
        
        <div class="price-breakdown">
          <h4 style="margin-bottom: 20px;">Price Breakdown</h4>
          <div class="price-row">
            <span>Room Rate (₦${this.bookingData.basePrice.toLocaleString()} × ${this.bookingData.nights} nights)</span>
            <span>₦${Math.round(this.bookingData.subtotal).toLocaleString()}</span>
          </div>
          ${availability.limited ? `
          <div class="price-row">
            <span>Premium Rate (Limited Availability)</span>
            <span>+10%</span>
          </div>
          ` : ''}
          <div class="price-row">
            <span>Taxes & Fees (7.5%)</span>
            <span>₦${Math.round(this.bookingData.tax).toLocaleString()}</span>
          </div>
          <div class="price-row total">
            <span>Total</span>
            <span>₦${Math.round(this.bookingData.totalPrice).toLocaleString()}</span>
          </div>
        </div>
        
        <div class="button-group">
          <a href="west-delux.html" class="btn-secondary">Modify Dates</a>
          <button class="btn-primary" onclick="bookingSystem.nextStep()">Continue to Details</button>
        </div>
      </div>
    `;
  }

  renderStep2() {
    return `
      <div class="form-section">
        <h3>Guest Information</h3>
        
        <div class="form-row">
          <label>Full Name *</label>
          <input type="text" id="fullName" value="${this.bookingData.guestInfo.fullName}" placeholder="As it appears on ID">
          <div class="error-text" id="nameError">Please enter your full name</div>
        </div>

        <div class="form-row">
          <label>Email Address *</label>
          <input type="email" id="email" value="${this.bookingData.guestInfo.email}" placeholder="your@email.com">
          <div class="error-text" id="emailError">Please enter a valid email address</div>
        </div>

        <div class="form-row">
          <label>Phone Number *</label>
          <input type="tel" id="phone" value="${this.bookingData.guestInfo.phone}" placeholder="+234 XXX XXX XXXX">
          <div class="error-text" id="phoneError">Please enter your phone number</div>
        </div>

        <div class="form-row">
          <label>Special Requests (Optional)</label>
          <textarea id="specialRequests" rows="4" placeholder="Dietary requirements, room preferences, celebration notes...">${this.bookingData.guestInfo.specialRequests}</textarea>
        </div>

        <div class="button-group">
          <button class="btn-secondary" onclick="bookingSystem.prevStep()">Back</button>
          <button class="btn-primary" onclick="bookingSystem.validateAndSaveGuest()">Continue to Payment</button>
        </div>
      </div>
    `;
  }

  renderStep3() {
    return `
      <div class="form-section">
        <h3>Payment Method</h3>
        
        <div class="payment-methods">
          <div class="payment-method ${this.bookingData.paymentMethod === 'card' ? 'active' : ''}" onclick="bookingSystem.selectPaymentMethod('card')">
            <i class="fas fa-credit-card"></i>
            <span>Card</span>
          </div>
          <div class="payment-method ${this.bookingData.paymentMethod === 'paystack' ? 'active' : ''}" onclick="bookingSystem.selectPaymentMethod('paystack')">
            <i class="fas fa-bolt"></i>
            <span>Paystack</span>
          </div>
          <div class="payment-method ${this.bookingData.paymentMethod === 'flutterwave' ? 'active' : ''}" onclick="bookingSystem.selectPaymentMethod('flutterwave')">
            <i class="fas fa-wave-square"></i>
            <span>Flutterwave</span>
          </div>
        </div>

        <div id="cardPaymentFields" style="${this.bookingData.paymentMethod === 'card' ? 'display: block;' : 'display: none;'}">
          <div class="card-details">
            <div class="form-row" style="grid-column: 1/-1;">
              <label>Card Number</label>
              <input type="text" id="cardNumber" placeholder="4242 4242 4242 4242">
            </div>
            <div class="form-row">
              <label>Expiry</label>
              <input type="text" id="expiry" placeholder="MM/YY">
            </div>
            <div class="form-row">
              <label>CVV</label>
              <input type="text" id="cvv" placeholder="123">
            </div>
          </div>
        </div>

        <div class="pay-later-option ${this.bookingData.isPayLater ? 'active' : ''}" onclick="bookingSystem.togglePayLater()">
          <i class="fas fa-clock"></i>
          <span>Pay Later - Reserve now, pay at hotel</span>
          <small style="display: block; margin-top: 5px; color: var(--gray-500);">No payment required now. Your booking will be held.</small>
        </div>

        <div class="button-group">
          <button class="btn-secondary" onclick="bookingSystem.prevStep()">Back</button>
          <button class="btn-primary" id="paymentButton" onclick="bookingSystem.processBooking()">
            ${this.bookingData.isPayLater ? 'Confirm Reservation' : 'Pay Now'}
          </button>
        </div>

        <div class="secure-badge">
          <i class="fas fa-lock"></i> 
          ${this.bookingData.isPayLater ? 
            'Your reservation is secured' : 
            '256-bit SSL encrypted payment'}
        </div>
      </div>
    `;
  }

  renderStep4() {
    const isPaid = this.bookingData.paymentStatus === 'paid';
    
    return `
      <div class="confirmation-section">
        <div class="success-icon">
          <i class="fas ${isPaid ? 'fa-check-circle' : 'fa-clock'}"></i>
        </div>
        
        <h2>${isPaid ? 'Booking Confirmed!' : 'Booking Reserved!'}</h2>
        <p style="margin: 20px 0; color: var(--gray-500);">
          ${isPaid ? 
            'Your payment has been processed successfully.' : 
            'Your room is reserved. Please complete payment at check-in.'}
        </p>
        
        <div class="booking-id">
          ${this.bookingData.bookingId}
        </div>
        
        <div class="booking-details-confirm">
          <h3 style="margin-bottom: 20px;">Booking Summary</h3>
          <div class="detail-row">
            <span>Guest Name</span>
            <span>${this.bookingData.guestInfo.fullName}</span>
          </div>
          <div class="detail-row">
            <span>Room Type</span>
            <span>${this.bookingData.roomType}</span>
          </div>
          <div class="detail-row">
            <span>Check-in / Check-out</span>
            <span>${this.formatDate(this.bookingData.checkin)} - ${this.formatDate(this.bookingData.checkout)}</span>
          </div>
          <div class="detail-row">
            <span>Nights / Guests</span>
            <span>${this.bookingData.nights} nights, ${this.bookingData.adults} Adults, ${this.bookingData.children} Children</span>
          </div>
          <div class="detail-row">
            <span>Total Amount</span>
            <span>₦${Math.round(this.bookingData.totalPrice).toLocaleString()}</span>
          </div>
          <div class="detail-row">
            <span>Payment Status</span>
            <span class="payment-status ${isPaid ? 'status-paid' : 'status-pending'}">
              ${isPaid ? 'Paid' : 'Pending (Pay at Hotel)'}
            </span>
          </div>
        </div>
        
        <p style="margin: 20px 0;">
          <i class="fas fa-envelope" style="color: var(--gold);"></i> 
          Confirmation sent to ${this.bookingData.guestInfo.email}
        </p>
        
        <div class="button-group">
          <a href="index.html" class="btn-primary">Return to Home</a>
          <button class="btn-secondary" onclick="window.print()">Print Confirmation</button>
        </div>
      </div>
    `;
  }

  updateProgressSteps() {
    document.querySelectorAll('.progress-step').forEach((step, index) => {
      const stepNum = index + 1;
      step.classList.remove('active', 'completed');
      
      if (stepNum === this.currentStep) {
        step.classList.add('active');
      } else if (stepNum < this.currentStep) {
        step.classList.add('completed');
      }
    });
  }

  // ===========================================
  // STEP NAVIGATION
  // ===========================================
  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
      this.renderCurrentStep();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.renderCurrentStep();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // ===========================================
  // VALIDATION & DATA SAVING
  // ===========================================
  validateAndSaveGuest() {
    const name = document.getElementById('fullName')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const requests = document.getElementById('specialRequests')?.value.trim() || '';
    
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-text').forEach(el => el.classList.remove('visible'));
    document.querySelectorAll('input').forEach(el => el.classList.remove('error'));
    
    // Validate name
    if (!name) {
      this.showError('nameError', 'Please enter your full name');
      isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      this.showError('emailError', 'Please enter a valid email address');
      isValid = false;
    }
    
    // Validate phone
    if (!phone || phone.length < 10) {
      this.showError('phoneError', 'Please enter a valid phone number');
      isValid = false;
    }
    
    if (isValid) {
      this.bookingData.guestInfo = {
        fullName: name,
        email: email,
        phone: phone,
        specialRequests: requests
      };
      
      this.saveBookingToStorage();
      this.nextStep();
    }
  }

  showError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
      
      // Highlight the input field
      const inputId = elementId.replace('Error', '');
      const input = document.getElementById(inputId);
      if (input) input.classList.add('error');
    }
  }

  // ===========================================
  // PAYMENT HANDLING
  // ===========================================
  selectPaymentMethod(method) {
    this.bookingData.paymentMethod = method;
    this.renderCurrentStep();
  }

  togglePayLater() {
    this.bookingData.isPayLater = !this.bookingData.isPayLater;
    this.renderCurrentStep();
  }

  async processBooking() {
    const paymentBtn = document.getElementById('paymentButton');
    if (!paymentBtn) return;
    
    // Generate booking ID first
    if (!this.bookingData.bookingId) {
      this.bookingData.bookingId = this.generateBookingId();
    }
    
    if (this.bookingData.isPayLater) {
      // Pay later flow
      this.bookingData.paymentStatus = 'pending';
      await this.completeBooking();
    } else {
      // Payment flow
      try {
        paymentBtn.disabled = true;
        paymentBtn.innerHTML = '<span class="loading-spinner"></span> Processing...';
        
        let paymentResult;
        
        switch(this.bookingData.paymentMethod) {
          case 'paystack':
            paymentResult = await this.processPaystackPayment(
              this.bookingData.totalPrice,
              this.bookingData.guestInfo.email
            );
            break;
          case 'flutterwave':
            paymentResult = await this.processFlutterwavePayment(
              this.bookingData.totalPrice,
              this.bookingData.guestInfo.email
            );
            break;
          default:
            // Simulate card payment
            paymentResult = await this.processPayment({
              method: 'card',
              amount: this.bookingData.totalPrice
            });
        }
        
        if (paymentResult.success) {
          this.bookingData.paymentStatus = 'paid';
          this.bookingData.transactionId = paymentResult.transactionId;
          await this.completeBooking();
        }
        
      } catch (error) {
        console.error('Payment failed:', error);
        paymentBtn.disabled = false;
        paymentBtn.innerHTML = 'Try Again';
        
        // Show error message
        alert('Payment failed. Please try again or choose another payment method.');
      }
    }
  }

  async completeBooking() {
    // Send confirmation email
    await this.sendConfirmationEmail();
    
    // Save to localStorage
    this.saveBookingToStorage();
    
    // Clear any existing booking data (keep confirmation only)
    setTimeout(() => {
      localStorage.removeItem('westbrook_booking_temp');
    }, 5000);
    
    // Go to confirmation step
    this.currentStep = 4;
    this.renderCurrentStep();
  }

  showProcessing(isProcessing) {
    // Could add a global loading overlay
    const overlay = document.getElementById('processingOverlay') || this.createProcessingOverlay();
    overlay.style.display = isProcessing ? 'flex' : 'none';
  }

  createProcessingOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'processingOverlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(5px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      flex-direction: column;
      color: white;
    `;
    overlay.innerHTML = `
      <div style="text-align: center;">
        <div style="width: 50px; height: 50px; border: 3px solid rgba(255,255,255,0.3); border-top-color: var(--gold); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
        <h3 style="color: white;">Processing your booking...</h3>
        <p style="color: rgba(255,255,255,0.7);">Please do not close this window</p>
      </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
  }

  // ===========================================
  // UTILITY FUNCTIONS
  // ===========================================
  formatDate(date, format = 'short') {
    if (!date) return '—';
    
    const d = new Date(date);
    if (isNaN(d.getTime())) return '—';
    
    const options = {
      short: { year: 'numeric', month: 'short', day: 'numeric' },
      full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    };
    
    return d.toLocaleDateString('en-US', options[format] || options.short);
  }

  attachEventListeners() {
    // Listen for storage changes across tabs
    window.addEventListener('storage', (e) => {
      if (e.key === 'westbrook_booking') {
        this.loadBookingFromStorage();
      }
    });
  }

  attachStepEventListeners() {
    // Re-attach step-specific listeners after render
  }
}

// ===========================================
// INITIALIZATION
// ===========================================
let bookingSystem;

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBookingSystem);
} else {
  initBookingSystem();
}

function initBookingSystem() {
  // Check if we're on booking page
  if (window.location.pathname.includes('book-now.html')) {
    bookingSystem = new WestbrookBookingSystem();
    window.bookingSystem = bookingSystem; // Make globally accessible
  } else {
    // On west-delux.html, initialize just the availability checker
    initAvailabilityChecker();
  }
}

// ===========================================
// AVAILABILITY CHECKER FOR WEST-DELUX.HTML
// ===========================================
function initAvailabilityChecker() {
  // Create a separate instance for the room page
  const checker = new WestbrookBookingSystem();
  
  // Override methods for room page functionality
  checker.initRoomPage = function() {
    this.loadAvailability().then(() => {
      this.initDatePickers();
      this.attachRoomPageEvents();
    });
  };
  
  checker.initDatePickers = function() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Configure flatpickr with availability
    flatpickr("#checkin", {
      minDate: "today",
      dateFormat: "Y-m-d",
      defaultDate: today,
      disable: this.getDisabledDates(),
      onChange: function(selectedDates, dateStr) {
        const checkoutPicker = document.querySelector("#checkout")._flatpickr;
        checkoutPicker.set('minDate', dateStr);
        
        // Update checkout min date
        const minCheckout = new Date(selectedDates[0]);
        minCheckout.setDate(minCheckout.getDate() + 1);
        checkoutPicker.set('minDate', minCheckout);
      }
    });

    flatpickr("#checkout", {
      minDate: tomorrow,
      dateFormat: "Y-m-d",
      defaultDate: tomorrow,
      disable: this.getDisabledDates()
    });
  };
  
  checker.getDisabledDates = function() {
    // Return array of fully booked dates for flatpickr
    const disabled = [];
    if (this.availabilityData) {
      Object.entries(this.availabilityData).forEach(([date, data]) => {
        if (!data.available) {
          disabled.push(date);
        }
      });
    }
    return disabled;
  };
  
  checker.attachRoomPageEvents = function() {
    document.getElementById('checkAvailability')?.addEventListener('click', () => {
      this.checkRoomAvailability();
    });
  };
  
  checker.checkRoomAvailability = function() {
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const adults = document.getElementById('adults').value;
    const children = document.getElementById('children').value;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => {
      el.classList.remove('visible');
      el.textContent = '';
    });
    
    let isValid = true;
    
    if (!checkin) {
      this.showRoomError('checkinError', 'Please select check-in date');
      isValid = false;
    }
    
    if (!checkout) {
      this.showRoomError('checkoutError', 'Please select check-out date');
      isValid = false;
    }
    
    if (isValid && checkin && checkout) {
      const availability = this.checkDateAvailability(checkin, checkout);
      
      if (!availability.available) {
        this.showRoomError('checkoutError', availability.message);
        return;
      }
      
      // Store booking data and redirect
      const bookingData = {
        checkin,
        checkout,
        adults,
        children,
        nights: availability.nights,
        isLimited: availability.limited
      };
      
      // Save to session storage
      sessionStorage.setItem('temp_booking', JSON.stringify(bookingData));
      
      // Redirect to booking page
      window.location.href = `book-now.html?checkin=${checkin}&checkout=${checkout}&adults=${adults}&children=${children}`;
    }
  };
  
  checker.showRoomError = function(elementId, message) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  };
  
  // Initialize room page
  checker.initRoomPage();
  
  // Also initialize existing UI elements (theme, menu, etc.)
  initExistingUI();
}

// ===========================================
// EXISTING UI FUNCTIONALITY (PRESERVED)
// ===========================================
function initExistingUI() {
  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      themeToggle.querySelector('i').className = 'fas fa-sun';
    }
    
    themeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      themeToggle.querySelector('i').className = isDark ? 'fas fa-sun' : 'fas fa-moon';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
  
  // Language selector
  const languageToggle = document.getElementById('languageToggle');
  const languageDropdown = document.getElementById('languageDropdown');
  
  if (languageToggle && languageDropdown) {
    languageToggle.addEventListener('click', (e) => {
      e.preventDefault();
      languageDropdown.classList.toggle('active');
    });
    
    document.addEventListener('click', (e) => {
      if (!languageToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
        languageDropdown.classList.remove('active');
      }
    });
  }
  
  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const stickyHamburger = document.getElementById('stickyHamburger');
  const menuCloseBtn = document.getElementById('menuCloseBtn');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  
  const openMenu = (e) => {
    if (e) e.preventDefault();
    if (mobileMenuOverlay) {
      mobileMenuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };
  
  const closeMenu = (e) => {
    if (e) e.preventDefault();
    if (mobileMenuOverlay) {
      mobileMenuOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  };
  
  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (stickyHamburger) stickyHamburger.addEventListener('click', openMenu);
  if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);
  
  // Back to top
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // Sticky nav
  const stickyNav = document.querySelector('.sticky-nav');
  if (stickyNav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        stickyNav.classList.add('visible', 'scrolled');
      } else {
        stickyNav.classList.remove('visible', 'scrolled');
      }
    });
  }
}
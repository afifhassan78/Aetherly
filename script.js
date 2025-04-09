
        document.addEventListener('DOMContentLoaded', function() {
            
            const navItems = document.querySelectorAll('.nav-item');
            const sections = document.querySelectorAll('[id$="-section"]');
            
            navItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    navItems.forEach(navItem => navItem.classList.remove('active'));
                    
                  
                    this.classList.add('active');
                    
                   
                    sections.forEach(section => section.classList.add('hidden'));
                    
                    
                    const sectionId = this.getAttribute('data-section') + '-section';
                    document.getElementById(sectionId).classList.remove('hidden');
                });
            });
            
            const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
    
        filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
        
        this.classList.add('active');
        
        const period = this.getAttribute('data-period');
        console.log('Changing chart to period: ' + period);
       
        updateChartForPeriod(period);
    });
});


function updateChartForPeriod(period) {
    
    const streamingBar = document.querySelector('.category.streaming rect');
    const emailBar = document.querySelector('.category.email rect');
    const cloudBar = document.querySelector('.category.cloud rect');
    const otherBar = document.querySelector('.category.other rect');
    
    const streamingText = document.querySelector('.category.streaming text:nth-child(3)');
    const emailText = document.querySelector('.category.email text:nth-child(3)');
    const cloudText = document.querySelector('.category.cloud text:nth-child(3)');
    const otherText = document.querySelector('.category.other text:nth-child(3)');
    
    if (period === 'week') {
        animateBar(streamingBar, 130, streamingText, '12.0kg', 110);
        animateBar(emailBar, 60, emailText, '6.1kg', 180);
        animateBar(cloudBar, 70, cloudText, '7.0kg', 170);
        animateBar(otherBar, 15, otherText, '1.5kg', 235);
    } else if (period === 'month') {
        animateBar(streamingBar, 150, streamingText, '15.2kg', 90);
        animateBar(emailBar, 80, emailText, '8.3kg', 160);
        animateBar(cloudBar, 90, cloudText, '9.2kg', 150);
        animateBar(otherBar, 20, otherText, '2.0kg', 230);
    } else if (period === 'year') {
        animateBar(streamingBar, 180, streamingText, '18.5kg', 60);
        animateBar(emailBar, 100, emailText, '10.2kg', 140);
        animateBar(cloudBar, 110, cloudText, '11.3kg', 130);
        animateBar(otherBar, 40, otherText, '4.1kg', 210);
    }
}

function animateBar(barElement, newHeight, textElement, newValue, newY) {
    const currentHeight = parseInt(barElement.getAttribute('height'));
    const currentY = parseInt(barElement.getAttribute('y'));
    
    let steps = 0;
    const interval = setInterval(() => {
        steps++;
        const progress = steps / 20;
        const height = currentHeight + (newHeight - currentHeight) * progress;
        const y = currentY + (newY - currentY) * progress;
        
        barElement.setAttribute('height', height);
        barElement.setAttribute('y', y);
        
        if (steps >= 20) {
            clearInterval(interval);
            textElement.textContent = newValue;
        }
    }, 20);
}

            const actionBtns = document.querySelectorAll('.action-btn');
            const confirmationModal = document.getElementById('confirmationModal');
            const learnMoreModal = document.getElementById('learnMoreModal');
            const modalCloseBtns = document.querySelectorAll('.close-modal, .modal-btn-primary');
            const switchSearchBtn = document.getElementById('switchSearchBtn');
            
            actionBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const recommendationType = this.getAttribute('data-recommendation');
                    
                    if (recommendationType === 'eco-search') {
                    
                        learnMoreModal.style.display = 'flex';
                    } else {
                    
                        const modalTitle = document.getElementById('modalTitle');
                        const modalMessage = document.getElementById('modalMessage');
                        
                        if (recommendationType === 'streaming-quality') {
                            modalTitle.textContent = 'Streaming Quality Reduced';
                            modalMessage.textContent = 'Your video streaming quality has been set to standard definition by default. This change will reduce your carbon emissions by approximately 10kg CO₂e per month.';
                        } else if (recommendationType === 'cloud-cleanup') {
                            modalTitle.textContent = 'Cloud Storage Optimized';
                            modalMessage.textContent = 'We\'ve identified and removed 1.2GB of duplicate and unused files from your cloud storage. This will reduce your monthly carbon emissions by approximately 3kg CO₂e.';
                        }
                        
                        
                        document.getElementById('tickIcon').style.display = 'block';
                        confirmationModal.style.display = 'flex';
                        
                        
                        setTimeout(() => {
                            if (recommendationType === 'streaming-quality') {
                                updateMetric('Streaming Carbon', 12.1, 'negative');
                                updateMetric('Carbon Saved', 5.8, 'positive');
                                updateMetric('Sustainable Choices', 15, 'positive');
                            } else if (recommendationType === 'cloud-cleanup') {
                                updateMetric('Cloud Storage Carbon', 7.5, 'negative');
                                updateMetric('Carbon Saved', 5.2, 'positive');
                                updateMetric('Sustainable Choices', 15, 'positive');
                            }
                        }, 1000);
                    }
                    const recommendationItem = this.closest('.recommendation-item');
                    recommendationItem.style.opacity = '0.6';
                    this.textContent = 'Applied ✓';
                    this.style.backgroundColor = '#4caf50';
                    this.style.cursor = 'default';
                    this.onclick = null;
                });
            });
            
            modalCloseBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    confirmationModal.style.display = 'none';
                    learnMoreModal.style.display = 'none';
                });
            });
            
            switchSearchBtn.addEventListener('click', function() {
                learnMoreModal.style.display = 'none';
                
                document.getElementById('modalTitle').textContent = 'Search Engine Switched';
                document.getElementById('modalMessage').textContent = 'Your default search engine has been changed to Ecosia. Now every search you make will help plant trees around the world.';
                document.getElementById('tickIcon').style.display = 'block';
                confirmationModal.style.display = 'flex';
                
                setTimeout(() => {
                    updateMetric('Carbon Saved', 5.0, 'positive');
                    updateMetric('Sustainable Choices', 16, 'positive');
                }, 1000);
                
                const ecoSearchBtn = document.querySelector('[data-recommendation="eco-search"]');
                const recommendationItem = ecoSearchBtn.closest('.recommendation-item');
                recommendationItem.style.opacity = '0.6';
                ecoSearchBtn.textContent = 'Applied ✓';
                ecoSearchBtn.style.backgroundColor = '#4caf50';
                ecoSearchBtn.style.cursor = 'default';
                ecoSearchBtn.onclick = null;
            });

            const modeToggle = document.getElementById('modeToggle');
            modeToggle.addEventListener('change', function() {
                if (this.checked) {
                    console.log('Switched to Action Mode');
                
                } else {
                    console.log('Switched to Tracking Mode');
                }
            });
            
            function updateMetric(metricName, newValue, changeType) {
                const metricCards = document.querySelectorAll('.metric-card');
                
                metricCards.forEach(card => {
                    const title = card.querySelector('.metric-title').textContent;
                    if (title === metricName) {
                        const valueElement = card.querySelector('.metric-value');
                        const currentValue = parseFloat(valueElement.textContent);
                        
                        valueElement.textContent = newValue.toFixed(1);
                      
                        const changeElement = card.querySelector('.metric-change');
                        if (changeType === 'positive') {
                            changeElement.classList.remove('negative');
                            changeElement.classList.add('positive');
                            changeElement.innerHTML = '↑ ' + Math.abs(Math.round(((newValue - currentValue) / currentValue) * 100)) + '% from current';
                        } else {
                            changeElement.classList.remove('positive');
                            changeElement.classList.add('negative');
                            changeElement.innerHTML = '↓ ' + Math.abs(Math.round(((currentValue - newValue) / currentValue) * 100)) + '% from current';
                        }
                    }
                });
            }
            
            window.addEventListener('click', function(event) {
                if (event.target === confirmationModal) {
                    confirmationModal.style.display = 'none';
                }
                if (event.target === learnMoreModal) {
                    learnMoreModal.style.display = 'none';
                }
            });
            
            const sidebar = document.getElementById('sidebar');
            if (window.innerWidth <= 768) {
                sidebar.classList.add('hidden');
               
                const toggleBtn = document.createElement('button');
                toggleBtn.innerHTML = '☰';
                toggleBtn.style.background = 'none';
                toggleBtn.style.border = 'none';
                toggleBtn.style.color = 'white';
                toggleBtn.style.fontSize = '24px';
                toggleBtn.style.cursor = 'pointer';
                toggleBtn.style.marginRight = '15px';
                
                toggleBtn.addEventListener('click', function() {
                    sidebar.classList.toggle('hidden');
                });
                
                document.querySelector('.header-content').prepend(toggleBtn);
            }
        });

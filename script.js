// ===================== SHARED SIDEBAR & HEADER FUNCTIONALITY =====================

$(document).ready(function() {
    let sidebarExpanded = false;

    // Toggle Sidebar Function
    function toggleSidebar() {
        sidebarExpanded = !sidebarExpanded;
        $('#sidebar').toggleClass('expanded', sidebarExpanded);
        $('#content').toggleClass('expanded', sidebarExpanded);

        if ($(window).width() <= 768) {
            $('#sidebar').toggleClass('mobile-active', sidebarExpanded);
            $('.mobile-overlay').toggleClass('active', sidebarExpanded);
        }
    }

    // Sidebar Toggle Button Click
    $('#sidebarToggle').on('click', function(e) {
        e.stopPropagation();
        toggleSidebar();
    });

    // Close Sidebar on Document Click (Mobile)
    $(document).on('click', function(e) {
        if ($(window).width() <= 768 && sidebarExpanded) {
            if (!$(e.target).closest('#sidebar').length && !$(e.target).is('#sidebarToggle') && !$(e.target).closest('#sidebarToggle').length) {
                toggleSidebar();
            }
        }
    });

    // Mobile Overlay Click
    $('.mobile-overlay').on('click', function() {
        if (sidebarExpanded) {
            toggleSidebar();
        }
    });

    // Prevent Sidebar from Closing when Clicking Inside
    $('#sidebar').on('click', function(e) {
        e.stopPropagation();
    });

    // Check Mobile View on Resize
    function checkMobileView() {
        if($(window).width() <= 768) {
            $('#sidebar').removeClass('expanded').removeClass('mobile-active');
            $('#content').removeClass('expanded');
            $('.mobile-overlay').removeClass('active');
            sidebarExpanded = false;
        }
    }

    checkMobileView();
    $(window).resize(checkMobileView);

    // ===================== AUTH PAGE FUNCTIONALITY =====================
    
    // Auth Form Submit
    $('#authForm').on('submit', function(e) {
        e.preventDefault();
        
        const username = $('#username').val();
        const password = $('#password').val();
        const rememberMe = $('#rememberMe').is(':checked');

        $('.btn-auth').html('<i class="fas fa-spinner fa-spin me-2"></i>Giriş Yapılıyor...');
        $('.btn-auth').prop('disabled', true);
        
        setTimeout(function() {
            alert('Giriş başarılı! Admin paneline yönlendiriliyorsunuz...');
            window.location.href = 'panel.html';
        }, 1500);
    });

    // Input Icon Focus Effects
    $('.form-control').on('focus', function() {
        $(this).prev('.input-icon').css({
            'border-color': 'var(--primary-color)',
            'background-color': '#eef2ff',
            'color': 'var(--primary-color)'
        });
    });

    $('.form-control').on('blur', function() {
        $(this).prev('.input-icon').css({
            'border-color': '#e5e7eb',
            'background-color': '#f1f5f9',
            'color': '#64748b'
        });
    });

    // ===================== PANEL CHARTS =====================
    
    // Sales Chart (Panel Page)
    if ($('#salesChart').length) {
        const salesCtx = document.getElementById('salesChart').getContext('2d');
        const salesChart = new Chart(salesCtx, {
            type: 'line',
            data: {
                labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
                datasets: [{
                    label: 'Satışlar',
                    data: [12000, 19000, 15000, 25000, 22000, 30000],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Category Chart (Panel Page)
    if ($('#categoryChart').length) {
        const categoryCtx = document.getElementById('categoryChart').getContext('2d');
        const categoryChart = new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: ['Elektronik', 'Giyim', 'Ev Eşyaları', 'Kitaplar', 'Diğer'],
                datasets: [{
                    data: [30, 25, 20, 15, 10],
                    backgroundColor: [
                        '#6366f1',
                        '#8b5cf6',
                        '#10b981',
                        '#f59e0b',
                        '#06b6d4'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // ===================== USER FORM FUNCTIONALITY =====================
    
    // Password Validation Function
    function validatePassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return regex.test(password);
    }

    // User Form Submit
    $('#userForm').on('submit', function(e) {
        e.preventDefault();
        
        const form = this;
        
        // Basic Validation
        if (!form.checkValidity() === false) {
            e.stopPropagation();
        }
        
        // Password Validation
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        
        if (!validatePassword(password)) {
            alert('Şifre en az 8 karakter, 1 büyük harf, 1 küçük harf ve 1 sayı içermelidir.');
            return false;
        }
        
        if (password !== confirmPassword) {
            alert('Şifreler eşleşmiyor!');
            return false;
        }
        
        // Collect Form Data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        data.permissions = $('input[name="permissions"]:checked').map(function() {
            return this.value;
        }).get();
        
        // Success Message
        alert('Kullanıcı başarıyla kaydedilmiştir!');
        console.log('Form Verisi:', data);
        
        // Reset Form
        form.reset();
        form.classList.remove('was-validated');
    });

});

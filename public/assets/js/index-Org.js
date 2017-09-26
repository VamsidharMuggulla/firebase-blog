          var OAUTHURL = 'https://accounts.google.com/o/oauth2/auth?';
          var SCOPE = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
          var CLIENTID = '826347454274.apps.googleusercontent.com';
         // var REDIRECT = 'http://www.brio.co.in/online-payroll-signup-confirm/'
          var TYPE = 'code';
          var _url = OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + '&redirect_uri=' + REDIRECT + '&response_type=' + TYPE;
    
          var loggedIn = false;
          var isEmailValid;
          var isDomainValid;
          var IsPasswordValid;
          var IsMobileValid;
          var Page_IsValid;
 
  function onnavclick(){
         $(".navbar-collapse").collapse('hide');
    }

// parallax
	$(document).ready(function(){
		if($(window).width() >991){
			$('#banner-section').parallax();
		}
	})

	window.Persondata = {};
	window.PersondataPlus = {};

	var payPerPerson = 40
	var payPerPersonPlus = 30
	var minPay = 995

	for(i=1;i<=200;i+=1){
        
       if(i<=25)
       {
        var PersonDetails = {
        No_of_Person: i,
        Pay: minPay

        };
        Persondata[i] = PersonDetails;   
            }
            else
            {
        var PersonDetails = {
        No_of_Person: i,
        Pay: minPay+(payPerPerson * (i-25))
        };
        Persondata[i] = PersonDetails;
        }   
    }

 var Page_ValidationActive = false;
    if (typeof(ValidatorOnLoad) == "function") {
        ValidatorOnLoad();
    }
    
    
    
    document.getElementById('EmailAddressRequired').dispose = function() {
        Array.remove(Page_Validators, document.getElementById('EmailAddressRequired'));
    }
    
    document.getElementById('Emailregexvalidation').dispose = function() {
        Array.remove(Page_Validators, document.getElementById('Emailregexvalidation'));
    }
    
    document.getElementById('DomainNameRequired').dispose = function() {
        Array.remove(Page_Validators, document.getElementById('DomainNameRequired'));
    }
    
    document.getElementById('DomainNameRegexpvalidation').dispose = function() {
        Array.remove(Page_Validators, document.getElementById('DomainNameRegexpvalidation'));
    }
    
    document.getElementById('PasswordRequired').dispose = function() {
        Array.remove(Page_Validators, document.getElementById('PasswordRequired'));
    }
    
    document.getElementById('passwordValidation').dispose = function() {
        Array.remove(Page_Validators, document.getElementById('passwordValidation'));
    }
    
    document.getElementById('MobileNumberRequired').dispose = function() {
        Array.remove(Page_Validators, document.getElementById('MobileNumberRequired'));
    }

$('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    })

	// plus plan
	$('.plus-range').rangeslider({
		polyfill: false,
		onSlideEnd: function(position, value){

		},
		onInit: function() {
			// apply position for tooltip on load
			var getPosition = $(".bussiness-tab-section .rangeslider__handle").css("left");
			$('.bussiness-tab-section .tooltip-range').animate({
				'left' : getPosition,
			},0);
			// apply value on load
			var value = $('input').val();
			if (value) {
				var No_of_Person = PersondataPlus[value].No_of_Person;
				var Pay1 = PersondataPlus[value].Pay;
				$(".bussiness-tab-section .Range-content h5").html(No_of_Person);
				$(".bussiness-tab-section .cost-applied").html(Pay1);
			}
		},
		onSlide: function(position, value) {
			if (value) {debugger
				var No_of_Person = PersondataPlus[value].No_of_Person;
				var Pay1 = PersondataPlus[value].Pay;
				$(".bussiness-tab-section .Range-content h5").html(No_of_Person);
				$(".bussiness-tab-section .cost-applied").html(Pay1);
			};
			$('.bussiness-tab-section .tooltip-range').animate({
				'left' : position,
			},0);
		},
	})

    	// economic plan
	$('.economic-range').rangeslider({
		polyfill: false,
		onSlideEnd: function(position, value){

		},
		onInit: function() {
			// apply position for tooltip on load
			var getPosition = $(".rangeslider__handle").css("left");
			$('.economic-tab-section .tooltip-range').animate({
				'left' : getPosition,
			},0);
			// apply value on load
			var value = $('input').val();
			if (value) {
				var No_of_Person = Persondata[value].No_of_Person;
				var Pay = Persondata[value].Pay;
				$(".economic-tab-section .Range-content h5").html(No_of_Person);
				$(".economic-tab-section .cost-applied").html(Pay);
			}
		},
		onSlide: function(position, value) {
			if (value) {
                 if (value==200){
                    $("#getstart").css("display","none")
                    $("#btncontactus").css("display","block")
                    $("#lblmaxprice").css("display","block")
                }else{
                    $("#getstart").css("display","block")
                    $("#btncontactus").css("display","none")
                    $("#lblmaxprice").css("display","none")
                }
				var No_of_Person = Persondata[value].No_of_Person;
				var Pay = Persondata[value].Pay;
				$(".economic-tab-section .Range-content h5").html(No_of_Person);
				$(".economic-tab-section .cost-applied").html(Pay);
			};
			$('.economic-tab-section .tooltip-range').animate({
				'left' : position,
			},0);
		},
	})


 function login_google() {
              var win = window.open(_url, "Google Authentication", 'width=800, height=600');
          }

    function httpGetEmail(email)
           {
            $.ajax('http://perk.brio.co.in/api/Controllers/Tenant/'+'""'+'/'+email+'/', {
                  dataType: 'json',
                  success:function (data) {
                   if(data[0].email === 'True')
                   {
                   $('#EmailAlreadyExist').css('display','');
                   isEmailValid=false;
                   }
                   else
                   {
                       $('#EmailAlreadyExist').css('display','none');
                       isEmailValid=true;
                   }
               },
               error: function(data)
               {
    
                   alert("error");
               }
                 // data: {'domain':'brio.co.in','email':'brio.co.in'}
                });
    
           }
    
    function httpGetDomain(domain)
           {
            $.ajax('http://perk.brio.co.in/api/Controllers/Tenant/'+domain+'/'+'""/', {
                  dataType: 'json',
                  success:function (data) {
                   if(data[0].domain === 'True')
                   {
                   $('#domainnameexist').css('display','');
                   isDomainValid=false;
                   }
                   else
                   {
                       $('#domainnameexist').css('display','none');
                       isDomainValid=true;
                   }
               },
               error: function(data)
               {
    
                   alert("error");
               }
                 // data: {'domain':'brio.co.in','email':'brio.co.in'}
                });
    
           }
    
          function ValidateDomain(txtCode) {
    
              if(txtCode.value === "")
             {
                $('#DomainNameRequired').css('display','');
                isDomainValid=false;
             }
              else {
                  $('#DomainNameRequired').css('display','none');
                  var domain = txtCode.value.toString();
                  txtCode.value = domain.toLowerCase().replace('http://www.', '').replace('http://', '').replace('www.', '');
                 httpGetDomain(txtCode.value.trim());
                 var regxDomain =ValidateDomainReg(txtCode.value.trim());
                 if(!regxDomain)
                  {
                     $('#DomainNameRegexpvalidation').css('display','');
                     isDomainValid=false;
                  }
                 else
                  {
                     $('#DomainNameRegexpvalidation').css('display','none');
                     isDomainValid=true;
                  }
    
              }
          }
    
          function validateEmailReg(email) {
              if(email.value === "")
             {
                $('#EmailAddressRequired').css('display','');
                return false;
             }
             else
             {
               var re = /^[a-z0-9_\+-]+(\.[a-z0-9_\+-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,4})$/i;  return re.test(email);
             }
        }
          function ValidateDomainReg(domain) {
          if(domain.value === "")
             {
                $('#DomainNameRequired').css('display','');
                return false;
             }
             else
             {
          var re = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}$/i;  return re.test(domain);
             }
           }
          function ValidateEmail(emailAddress) {
             if(emailAddress.value === "")
             {
                $('#EmailAddressRequired').css('display','');
                isEmailValid=false;
             }
    
              else {
    
                  $('#EmailAddressRequired').css('display','none');
                  httpGetEmail(emailAddress.value.trim());
                  var regxEmail= validateEmailReg(emailAddress.value.trim());
                  if(!regxEmail)
                  {
                     $('#Emailregexvalidation').css('display','');
                     isEmailValid=false;
                  }
                  if(regxEmail)
                  {
                     $('#Emailregexvalidation').css('display','none');
                     isEmailValid=true;
                  }
                    }
    
          }
          function ValidatePassword(Vpassword) {
              var Vpassword = Vpassword.value;
             if(Vpassword.length === "")
             {
                $('#PasswordRequired').css('display','');
                IsPasswordValid= false;
             }
             else{
                 $('#PasswordRequired').css('display','none');
                 if(Vpassword.length >= 4 && Vpassword.length <= 12){
                 $('#passwordValidation').css('display','none');
                 IsPasswordValid= true;
    
                 }
                 else{
                     $('#passwordValidation').css('display','');
                     IsPasswordValid= false;
                 }
             }
          }
          function ValidateMobile(Vmobile) {
             if(Vmobile.value === "")
             {
                $('#MobileNumberRequired').css('display','');
                IsMobileValid=false;
             }
             else{
                 $('#MobileNumberRequired').css('display','none');
                 IsMobileValid= true;
             }
          }
    
          function onSubmit() {
            isEmailValid= isEmailValid === true ?  validateEmailReg($('#EmailAddress').val().trim()):isEmailValid;
            isDomainValid= isDomainValid === true ?  ValidateDomainReg($('#DomainName').val().trim()):isDomainValid;
              if (!isEmailValid || !isDomainValid ||!IsPasswordValid || !IsMobileValid)
             {
                 debugger;
                  return false;
             }
              else
              {
                  
                  var msg = 'Thankyou for choosing Perk Payroll , please check your email for activation'
                  debugger;
                  swal("You have signed up successfully",msg,"success") 
                 /* swal({
                        title: "You have signed up successfully",
                        text: "I will close in 2 seconds.",
                        timer: 5000,
                        showConfirmButton: false
                        
                        });}*/
                 return false;
    
              
          }
          }
          $('button.confirm').on('keyup keypress click',function(){
              window.location.replace( "http://www.perkpayroll.com/")
          })
          function onlyNumbersandPlus(e) { var keynum; if (window.event) { keynum = e.keyCode } else if (e.which) { keynum = e.which } if (keynum == 43) { return true; } if (keynum > 31 && keynum < 48 || keynum > 57) return false; return true; }
          function GetImage()
          {
              $.ajax('http://perk.brio.co.in/api/BingImageURL', {
                  dataType: 'json',
                  success:function (data) {
    
                   //if(data[0].bingURL != '' || data[0].bingURL != null)
                   //{
                       $('.login').css('background-image','url('+data[0].bingURL+')');
                       $('#bgimg').val(data[0].bingURL);
                       document.body.style.backgroundImage = "url('" + data[0].bingURL + "')";
                  // }
                   if(data[0].copyright != '' || data[0].copyright != null)
                   {
                       $('#copy_right').text(data[0].copyright);
                       $('#cright').val(data[0].copyright);
                   }
    
    
               },
               error: function(data)
               {	
                    alert("error");
               }
                 // data: {'domain':'brio.co.in','email':'brio.co.in'}
                });
          }

      
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date(); a = s.createElement(o),
            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
    
        ga('create', 'UA-6043397-3', 'brio.co.in');
        ga('send', 'pageview');
    
                    
             setTimeout(function () {
    
                 //GetImage();
                var img = document.getElementById('bgimg').value;
                document.body.style.backgroundImage = "url('" + img + "')";
                document.getElementById('copy_right').innerHTML = document.getElementById('cright').value;
            }, 5000);
    
             
            function getCookie(name) { //Gets the value of traffic_source
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
    
                    if (parts.length == 2) return parts.pop().split(";").shift();
            }
    
            function addTrafficSourceToForm(){  //injects the traffic_source value to the form
            document.getElementById("leadSource").value = getCookie("traffic_source");
                    //window.alert(document.getElementById("entry_1000661693").value);
            }
    
            addTrafficSourceToForm() //initates the process
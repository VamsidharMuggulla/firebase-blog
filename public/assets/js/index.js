var OAUTHURL='https://accounts.google.com/o/oauth2/auth?';var SCOPE='https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';var CLIENTID='826347454274.apps.googleusercontent.com';var TYPE='code';var _url=OAUTHURL+'scope='+SCOPE+'&client_id='+CLIENTID+'&redirect_uri='+REDIRECT+'&response_type='+TYPE;var loggedIn=!1;var isEmailValid;var isDomainValid;var IsPasswordValid;var IsMobileValid;var Page_IsValid;function onnavclick(){$(".navbar-collapse").collapse('hide')}
$(document).ready(function(){if($(window).width()>991){$('#banner-section').parallax()}})
window.Persondata={};window.PersondataPlus={};var payPerPerson=40
var payPerPersonPlus=30
var minPay=995
for(i=1;i<=200;i+=1){if(i<=25)
{var PersonDetails={No_of_Person:i,Pay:minPay};Persondata[i]=PersonDetails}
else{var PersonDetails={No_of_Person:i,Pay:minPay+(payPerPerson*(i-25))};Persondata[i]=PersonDetails}}
var Page_ValidationActive=!1;if(typeof(ValidatorOnLoad)=="function"){ValidatorOnLoad()}
document.getElementById('EmailAddressRequired').dispose=function(){Array.remove(Page_Validators,document.getElementById('EmailAddressRequired'))}
document.getElementById('Emailregexvalidation').dispose=function(){Array.remove(Page_Validators,document.getElementById('Emailregexvalidation'))}
document.getElementById('DomainNameRequired').dispose=function(){Array.remove(Page_Validators,document.getElementById('DomainNameRequired'))}
document.getElementById('DomainNameRegexpvalidation').dispose=function(){Array.remove(Page_Validators,document.getElementById('DomainNameRegexpvalidation'))}
document.getElementById('PasswordRequired').dispose=function(){Array.remove(Page_Validators,document.getElementById('PasswordRequired'))}
document.getElementById('passwordValidation').dispose=function(){Array.remove(Page_Validators,document.getElementById('passwordValidation'))}
document.getElementById('MobileNumberRequired').dispose=function(){Array.remove(Page_Validators,document.getElementById('MobileNumberRequired'))}
$('.navbar-collapse a').click(function(){$(".navbar-collapse").collapse('hide')})
$('.plus-range').rangeslider({polyfill:!1,onSlideEnd:function(position,value){},onInit:function(){var getPosition=$(".bussiness-tab-section .rangeslider__handle").css("left");$('.bussiness-tab-section .tooltip-range').animate({'left':getPosition,},0);var value=$('input').val();if(value){var No_of_Person=PersondataPlus[value].No_of_Person;var Pay1=PersondataPlus[value].Pay;$(".bussiness-tab-section .Range-content h5").html(No_of_Person);$(".bussiness-tab-section .cost-applied").html(Pay1)}},onSlide:function(position,value){if(value){debugger
var No_of_Person=PersondataPlus[value].No_of_Person;var Pay1=PersondataPlus[value].Pay;$(".bussiness-tab-section .Range-content h5").html(No_of_Person);$(".bussiness-tab-section .cost-applied").html(Pay1)};$('.bussiness-tab-section .tooltip-range').animate({'left':position,},0)},})
$('.economic-range').rangeslider({polyfill:!1,onSlideEnd:function(position,value){},onInit:function(){var getPosition=$(".rangeslider__handle").css("left");$('.economic-tab-section .tooltip-range').animate({'left':getPosition,},0);var value=$('input').val();if(value){var No_of_Person=Persondata[value].No_of_Person;var Pay=Persondata[value].Pay;$(".economic-tab-section .Range-content h5").html(No_of_Person);$(".economic-tab-section .cost-applied").html(Pay)}},onSlide:function(position,value){if(value){if(value==200){$("#getstart").css("display","none")
$("#btncontactus").css("display","block")
$("#lblmaxprice").css("display","block")}else{$("#getstart").css("display","block")
$("#btncontactus").css("display","none")
$("#lblmaxprice").css("display","none")}
var No_of_Person=Persondata[value].No_of_Person;var Pay=Persondata[value].Pay;$(".economic-tab-section .Range-content h5").html(No_of_Person);$(".economic-tab-section .cost-applied").html(Pay)};$('.economic-tab-section .tooltip-range').animate({'left':position,},0)},})
function login_google(){var win=window.open(_url,"Google Authentication",'width=800, height=600')}
function httpGetEmail(email)
{$.ajax('http://perk.brio.co.in/api/Controllers/Tenant/'+'""'+'/'+email+'/',{dataType:'json',success:function(data){if(data[0].email==='True')
{$('#EmailAlreadyExist').css('display','');isEmailValid=!1}
else{$('#EmailAlreadyExist').css('display','none');isEmailValid=!0}},error:function(data)
{alert("error")}})}
function httpGetDomain(domain)
{$.ajax('http://perk.brio.co.in/api/Controllers/Tenant/'+domain+'/'+'""/',{dataType:'json',success:function(data){if(data[0].domain==='True')
{$('#domainnameexist').css('display','');isDomainValid=!1}
else{$('#domainnameexist').css('display','none');isDomainValid=!0}},error:function(data)
{alert("error")}})}
function ValidateDomain(txtCode){if(txtCode.value==="")
{$('#DomainNameRequired').css('display','');isDomainValid=!1}
else{$('#DomainNameRequired').css('display','none');var domain=txtCode.value.toString();txtCode.value=domain.toLowerCase().replace('http://www.','').replace('http://','').replace('www.','');httpGetDomain(txtCode.value.trim());var regxDomain=ValidateDomainReg(txtCode.value.trim());if(!regxDomain)
{$('#DomainNameRegexpvalidation').css('display','');isDomainValid=!1}
else{$('#DomainNameRegexpvalidation').css('display','none');isDomainValid=!0}}}
function validateEmailReg(email){if(email.value==="")
{$('#EmailAddressRequired').css('display','');return!1}
else{var re=/^[a-z0-9_\+-]+(\.[a-z0-9_\+-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,4})$/i;return re.test(email)}}
function ValidateDomainReg(domain){if(domain.value==="")
{$('#DomainNameRequired').css('display','');return!1}
else{var re=/^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}$/i;return re.test(domain)}}
function ValidateEmail(emailAddress){if(emailAddress.value==="")
{$('#EmailAddressRequired').css('display','');isEmailValid=!1}
else{$('#EmailAddressRequired').css('display','none');httpGetEmail(emailAddress.value.trim());var regxEmail=validateEmailReg(emailAddress.value.trim());if(!regxEmail)
{$('#Emailregexvalidation').css('display','');isEmailValid=!1}
if(regxEmail)
{$('#Emailregexvalidation').css('display','none');isEmailValid=!0}}}
function ValidatePassword(Vpassword){var Vpassword=Vpassword.value;if(Vpassword.length==="")
{$('#PasswordRequired').css('display','');IsPasswordValid=!1}
else{$('#PasswordRequired').css('display','none');if(Vpassword.length>=4&&Vpassword.length<=12){$('#passwordValidation').css('display','none');IsPasswordValid=!0}
else{$('#passwordValidation').css('display','');IsPasswordValid=!1}}}
function ValidateMobile(Vmobile){if(Vmobile.value==="")
{$('#MobileNumberRequired').css('display','');IsMobileValid=!1}
else{$('#MobileNumberRequired').css('display','none');IsMobileValid=!0}}
function onSubmit(){isEmailValid=isEmailValid===!0?validateEmailReg($('#EmailAddress').val().trim()):isEmailValid;isDomainValid=isDomainValid===!0?ValidateDomainReg($('#DomainName').val().trim()):isDomainValid;if(!isEmailValid||!isDomainValid||!IsPasswordValid||!IsMobileValid)
{debugger;return!1}
else{var msg='Thankyou for choosing Perk Payroll , please check your email for activation'
debugger;swal("You have signed up successfully",msg,"success")
return!1}}
$('button.confirm').on('keyup keypress click',function(){window.location.replace("http://www.perkpayroll.com/")})
function onlyNumbersandPlus(e){var keynum;if(window.event){keynum=e.keyCode}else if(e.which){keynum=e.which}if(keynum==43){return!0}if(keynum>31&&keynum<48||keynum>57)return!1;return!0}
function GetImage()
{$.ajax('http://perk.brio.co.in/api/BingImageURL',{dataType:'json',success:function(data){$('.login').css('background-image','url('+data[0].bingURL+')');$('#bgimg').val(data[0].bingURL);document.body.style.backgroundImage="url('"+data[0].bingURL+"')";if(data[0].copyright!=''||data[0].copyright!=null)
{$('#copy_right').text(data[0].copyright);$('#cright').val(data[0].copyright)}},error:function(data)
{alert("error")}})}(function(i,s,o,g,r,a,m){i.GoogleAnalyticsObject=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create','UA-6043397-3','brio.co.in');ga('send','pageview');setTimeout(function(){var img=document.getElementById('bgimg').value;document.body.style.backgroundImage="url('"+img+"')";document.getElementById('copy_right').innerHTML=document.getElementById('cright').value},5000);function getCookie(name){var value="; "+document.cookie;var parts=value.split("; "+name+"=");if(parts.length==2)return parts.pop().split(";").shift()}
function addTrafficSourceToForm(){document.getElementById("leadSource").value=getCookie("traffic_source")}
addTrafficSourceToForm()
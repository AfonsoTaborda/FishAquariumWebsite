function randomMovement(IdRef) {
    var positionH = $(window).height() - $(IdRef).height();
    var positionW = $(window).width() - $(IdRef).width();
    var time = Math.floor(((Math.random() * 3) + 2) * 1000);
    $(IdRef).animate({left: Math.floor(Math.random() * positionW), top: Math.floor(Math.random() * positionH)}, time, function () {
        randomMovement(IdRef)});
}

randomMovement("#fish1Id");
randomMovement("#fish2Id");

$('#fish2Id').mouseover(function () {
    $('#fish2Id').stop(true);
    var x = Math.floor(Math.random() * ($(window).width() - $(this).width()));
    var y = Math.floor(Math.random() * ($(window).height() - $(this).height()));

    console.log(x+" " + y);
    $('#fish2Id').animate({top: y, left: x});
    randomMovement("#fish2Id");
});

$('#fish1Id').dblclick(function() {
    $('#fish1Id').stop(true);
    $('#fish1Id').animate({height: "+=110", width: "+=110"}).animate({height: "-=50", width: "-=50"});
    randomMovement("#fish1Id");
});

$('*').click(function(event) {
    $('#fish1Id').stop(true);
    var y = event.pageY - $('#fish1Id').height()/2;
    var x = event.pageX - $('#fish1Id').width()/2;
    $('#fish1Id').delay(200).animate({top: y, left: x});
    randomMovement("#fish1Id");
});

var bubbleAnimationSpeedRandom = 3000;
var bubbleAnimationSpeedStatic = 3000;
var bubbleAnimationCooldownRandom = 7000;
bubbleAnimateLoop('#bubble1Id', true, -1);
bubbleAnimateLoop('#bubble2Id', true, -1);
bubbleAnimateLoop('#bubble3Id', true, -1);
$('.bubbleClass').click(function() { 
	$(this).stop(true);
	$(this).fadeOut(400, function() { bubbleAnimateLoop($(this), false, parseInt($('#hitCount').html()) + 1); });
});
function bubbleAnimateLoop(idRef, initialDelay, hitCount)
{
	console.log(hitCount);
	if(hitCount > 0){
		$('#hitCount').removeClass('hidden');
		$('#hitCount').html(hitCount);
		
		//increase the speed of the game!
		bubbleAnimationSpeedRandom -= 50;
		bubbleAnimationSpeedStatic -= 75;
	}
	else if(hitCount == 0)
		{
		$('#hitCount').html(hitCount)
		$('#hitCount').css("font-size", "4em");
		$('#hitCount').html("You failed!");
		$('#hitCount').animate({ fontSize: "3em"}, 1000, "linear", function() {
			$('#hitCount').html(0);
			$('#hitCount').addClass('hidden');
			
			bubbleAnimationSpeedRandom = 3000;
			bubbleAnimationSpeedStatic = 3000;
		});
		console.log("hide");	
		}
		
	$(idRef).show();
	//move bubbles out of the viewport
	var x = Math.floor(Math.random() * ($(window).width() - $(idRef).width()));
	var y = Math.floor($(window).height());
	$(idRef).offset({ left: x, top: y});
	
	
	//animate towards the top of the viewport
	var animateY = -$(idRef).height();
	if(initialDelay)
		$(idRef).delay(Math.random() * 4000);
	$(idRef).animate({
			top: animateY
		}, Math.random() * bubbleAnimationSpeedRandom + bubbleAnimationSpeedStatic, "linear", function () {
			bubbleAnimateLoop(idRef, false, 0);
		}).delay(Math.random() * bubbleAnimationCooldownRandom);
}

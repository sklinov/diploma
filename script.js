$(function() {
	//menu burger

	$('#menu__burger').click(function() {
		show_menu();
	});	

	//modal windows

	$('#order-call,#order-call-footer').click(function() {
		show_modal(false,"Заказать звонок");
	});
	$('#know-more,#know-price,#know-project').click(function() {
		show_modal(true,"Cвязаться с нами");
	});
	//gallery

	gallery_arrows();

	gallery();

	// flying letters
	var first_letter_count=5;
	var second_letter_count=5;
	var first_start_position=0;
	var second_start_position=5;
	
	var first_screen=$('#firstscreen');
	var price=$('#price');
	var first=$('.fly-first');
	var second=$('.fly-second');

	var starting_point=set_starting_point(first_screen,first,30);
	var c=define_coordinates(first_screen,starting_point,first_letter_count);
	

	make_letters_fly(first_start_position,first_letter_count,c.rotation,c.posx,c.posy,c.size);

	price.mouseover(function () {
					  var starting_point=set_starting_point(price,second,50);
					  var c=define_coordinates(price,starting_point,second_letter_count);
					  make_letters_fly(second_start_position,second_letter_count,c.rotation,c.posx,c.posy,c.size);
					  price.off('mouseover');
					 });

	});


function set_starting_point(block,letter_block,left_pos) {
	var position = block.position();
	var start_top = position.top;
	var height = block.height();
	var top_pos = height*0.5+start_top;

	letter_block.css({
					  "top": top_pos+"px",
					  "left": left_pos+"%"
						 });
	var starting_point = {'top' : top_pos, 'left' : left_pos};
	//console.log(starting_point);
	return starting_point; 
}

function define_coordinates(block,starting_point,letter_count) {
	var vertical_offset_limit=block.height()/2*0.8;
	var horizontal_offset_limit=block.width()*(starting_point.left/100)*0.8;
	var coord={posx:{},posy:{},size:{},rotation:{}};
	for(var i=0;i<letter_count;i++)
	{
		coord.posx[i]=(Math.round(Math.random())*2-1)*(Math.random()*((horizontal_offset_limit-horizontal_offset_limit/2)+horizontal_offset_limit/2));
		coord.posy[i]=(Math.round(Math.random())*2-1)*(Math.random()*((vertical_offset_limit-vertical_offset_limit/2)+vertical_offset_limit/2));
		coord.size[i]=15+Math.random()*40;
		coord.rotation[i]=Math.random()*45;
	}
	//console.log(coord);
	return coord;
}


function make_letters_fly(start_position, letter_count,rotation,posx,posy,size) {
		for(var i = 0; i <letter_count; i++) {
			var transition = "all 2s cubic-bezier(0, 0, 0.2, 1)";
			var transformation="translate("+posx[i]+"px,"+posy[i]+"px) rotate("+rotation[i]+"deg)";
			$('#fly'+(start_position+i+1)).css({
							 "transform": transformation,
							 "transition": transition,
							 "font-size": size[i]
							});

			$('#fly'+(start_position+i+1)).toggleClass("fly-hidden");
		}
	}

function show_menu() {
	$('#menu').toggleClass("menu-popup");
	$('#menu').toggleClass("menu-popup-shown");
	$('#menu__burger-burger').toggle();
	$('#menu__burger-clear').toggle();
	$('.menu__item.link').click(function() {
		show_menu();
	});
	}

function show_modal(show_mail,label) {
	$('.h3.h3-modal').html(label);
	if(show_mail)
	{
		$('.modal__form').css("height","60%");
		$('#mail, #mail-label').show();

	}
	if(!show_mail)
	{
		$('.modal__form').css("height","50%");
		$('#mail, #mail-label').hide();
	}
	var completed=false;
	$('#phone').mask("+7(999)999-99-99",{placeholder:" "});
	$('#modal-call').toggle();
	$('#modal__clear').click(function() {
		show_modal();
	});
	$('#order-call-button').click(function() {
		$('.modal__form').hide();
		$('.h3.h3-modal').html("Спасибо!<br>Мы свяжемся с вами в ближайшее время.");	
	});
}


function gallery() {
	var items=$('.gallery__item').length;
	var dots=$('.gallery__dot').length;
	console.log('items:'+items);
	console.log('dots:'+dots);
	$('.gallery__dot').click(function(){
		var index=$(this).index();
		$('.gallery__dot').removeClass("gallery__dot-active");
		$(this).addClass("gallery__dot-active");
		console.log(index);
	})

}

function gallery_arrows() {
	
	$('.gallery__arrow-left').click(function(){
		console.log('click arrow left');
   		$(".gallery__item:last").detach().insertBefore(".gallery__item:first");
	});

	$('.gallery__arrow-right').click(function(){
		console.log('click arrow right');
	    $(".gallery__item:first").detach().insertAfter(".gallery__item:last");
	});
}
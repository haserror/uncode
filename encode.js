$(function(){
	$("#encode").click(function () {
		var word = $("#word").val().split('');
		if (word.length != 4) {
			alert('○○は4文字にしてね')
			return;
		}
		let s = new Set(word);
		if (s.size != word.length) {
			alert('○○は全部違う文字にしてね')
			return;
		}
		
		var decoded = $("#decoded_txt").val();
		var encoded = "";
		for (var i = 0; i < decoded.length; i++){
			var ascii = decoded.charCodeAt(i);
			var quat = ascii.toString(4);
			while (quat.length < 8) {
				quat = "0" + quat;
			}
			encoded += quat;
		}

		encoded = encoded.replace(/0/g, word[0]);
		encoded = encoded.replace(/1/g, word[1]);
		encoded = encoded.replace(/2/g, word[2]);
		encoded = encoded.replace(/3/g, word[3]);

		$("#decoded_txt").val("");
		$("#encoded_txt").val(encoded);
		

	})

	$("#decode").click(function () {
		var word = $("#word").val().split('');
		var word = $("#word").val().split('');
		if (word.length != 4) {
			alert('○○は4文字にしてね')
			return;
		}
		let s = new Set(word);
		if (s.size != word.length) {
			alert('○○は全部違う文字にしてね')
			return;
		}

		var encoded = $("#encoded_txt").val();
		if (encoded.length % 8 != 0) {
			alert('文字数が不正でデコードできないよ')
			return;
		}

		var regExp = new RegExp(word[0] + '|' + word[1] + '|' + word[2] + '|' +  word[3], "g");
		var valid = encoded.replace(regExp, '');
		if (valid.length != 0) {
			alert('不正な文字が入ってるのでデコードできないよ')
			return;
		}

		regExp = new RegExp(word[0], "g");
		encoded = encoded.replace(regExp, '0');
		regExp = new RegExp(word[1], "g");
		encoded = encoded.replace(regExp, '1');
		regExp = new RegExp(word[2], "g");
		encoded = encoded.replace(regExp, '2');
		regExp = new RegExp(word[3], "g");
		encoded = encoded.replace(regExp, '3');

		var decoded = "";
		for (var i = 0; i < encoded.length; i += 8) {
			var quat = encoded.substring(i, i + 8);
			var ascii = parseInt(quat, 4);
			var c = String.fromCharCode(ascii);
			decoded += c;
		}

		$("#encoded_txt").val("");
		$("#decoded_txt").val(decoded);
	})
});


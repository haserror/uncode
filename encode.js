$(function () {

	$("#word").change(function () {
		var word = Array.from($("#word").val());
		if (word.length < 4) {
			return;
		}
		else if (word.length > 4) {
			$("#word").val(word[0] + word[1] + word[2] + word[3]);
			return;
		}
		var title = word[0] + word[1] + word[2];
		if (word[3] != "ー") {
			// 4文字にするために最後に伸ばし棒入れがちなので
			title += word[3];
		}
		$("#title_msg").text(title + "製造機");
	});

	$("#encode").click(function () {
		// validate
		$("#alert_msg").css('display', 'none');
		var word = Array.from($("#word").val());
		if (word.length != 4) {
			$("#alert_msg").text("製造物は4文字にしてね");
			$("#alert_msg").show();
			return;
		}
		let s = new Set(word);
		if (s.size != word.length) {
			$("#alert_msg").text("製造物は全部違う文字にしてね");
			$("#alert_msg").show();
			return;
		}
		var decoded = $("#decoded_txt").val();
		if (decoded.length == 0) {
			$("#alert_msg").text("変換前文章が空だよ");
			$("#alert_msg").show();
			return;
		}

		// encode
		var encoded = "";
		for (var i = 0; i < decoded.length; i++){
			var charCode = decoded.charCodeAt(i);
			var quat = charCode.toString(4);
			// 65536 == 4^8
			quat = quat.padStart(8, '0');
			encoded += quat;
		}

		encoded = encoded.replace(/0/g, word[0]);
		encoded = encoded.replace(/1/g, word[1]);
		encoded = encoded.replace(/2/g, word[2]);
		encoded = encoded.replace(/3/g, word[3]);

		// decoded → encoded
		$("#decoded_txt").val("");
		$("#encoded_txt").val(encoded);
	})


	$("#decode").click(function () {
		// validate
		$("#alert_msg").css('display', 'none');
		var word = Array.from($("#word").val());
		if (word.length != 4) {
			$("#alert_msg").text("製造物は4文字にしてね");
			$("#alert_msg").show();
			return;
		}
		let s = new Set(word);
		if (s.size != word.length) {
			$("#alert_msg").text("製造物は全部違う文字にしてね");
			$("#alert_msg").show();
			return;
		}
		var encoded = $("#encoded_txt").val();
		// サロゲートペア文字対応
		if (encoded.length == 0 || encoded.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '+').length % 8 != 0) {
			$("#alert_msg").text("文字数が不正でデコードできないよ");
			$("#alert_msg").show();
			return;
		}
		var regExp = new RegExp(word[0] + '|' + word[1] + '|' + word[2] + '|' +  word[3], "g");
		var valid = encoded.replace(regExp, '');
		if (valid.length != 0) {
			$("#alert_msg").text("不正な文字が入ってるのでデコードできないよ");
			$("#alert_msg").show();
			return;
		}

		// decode
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
			var charCode = parseInt(quat, 4);
			var c = String.fromCharCode(charCode);
			decoded += c;
		}

		// decoded ← encoded
		$("#encoded_txt").val("");
		$("#decoded_txt").val(decoded);
	})
});


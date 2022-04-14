<!DOCTYPE html>
<html lang="en">
  <head>
    <?php include dirname($_SERVER['DOCUMENT_ROOT']) . "/simpel.cc/php/head.php"; ?>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <header>
      <?php include dirname($_SERVER['DOCUMENT_ROOT']) . "/simpel.cc/php/header.php"; ?>
    </header>
    <main>
      <form>
        <div class="buttons" >
          <label for="characters">Number of characters:</label>
          <input id="characters" type="number" value="1000" onchange="trimLorem(this.value)">
        </div>
        <div class="buttons">
          <label for="paragraphs">Size of paragraphs:</label>
          <select id="paragraphs" onchange="paraLorem(this.value)" title="Size of paragraphs in characters">
            <option value="none">none</option>
            <option value="small">small (150 - 450)</option>
            <option value="middle">middle (450 - 750)</option>
            <option value="big">big (750 - 1050)</option>
          </select>
        </div>
        <div class="buttons">
          <label class="checkboxlabel" for="fixedlength">Fixed line length:</label>
          <input type="checkbox" id="fixedlength" onchange="fixLine()">
        </div>
        <div class="buttons">
          <label id="labellinechars" for="linechars" class="disablelabel">Characters per line:</label>
          <input id ="linechars" type="number" value="80" onchange="fixChars(this.value)" disabled>
        </div>
        <div class="buttons">
          <button type="button" onclick="copyLorem()">Copy &#34;Lorem Ipsum&#34;</button>
        </div>
      </form>
      <div id="loremipsum"></div>
      <p class="source">Text source: <a href="https://la.wikisource.org/wiki/De_finibus_bonorum_et_malorum/Liber_Primus" target="_blank">https://la.wikisource.org/wiki/De_finibus_bonorum_et_malorum/Liber_Primus</a></p>
    </main>
  </body>
  <script src="script.js"></script>
</html>

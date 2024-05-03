<!DOCTYPE html>
<html lang="en">
<html>
    <header>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="game.css">
        <script src="./game/script.js" type="module"></script>
        <title>Yummy Fresh Online</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Jomhuria&display=swap" rel="stylesheet">
    </header>

    <body style="overflow-x:scroll">
        <!--navigation-->
        <div class="navi-b">
            <div class="navi">
                <div class="column">
                    <img src="/image/logo.png" class="icon" alt="Home">
                </div>
                <div class="navi-tb">
                    <a class="navi-t" href="/index.php">Home</a>
                    <a class="navi-t" href="/rewards.php">Rewards</a>
                    <a class="navi-t" href="/order.php">Order</a>
                    <a class="navi-t" href="/account.php">Account</a>
                </div>
            </div>
        </div>

        <div class=gamebox>
            <div class="world" data-world>
                <div class="scoreboard">
                    <img src="/imgs/coin.gif" class="scoreimg">
                    <div class="score" data-score>0</div>
                    <div class="score" style="font-size:2vmin;margin-left:5px">pts</div>
                </div>
                <div class="start-screen" data-start-screen>Press Any Key To Start</div>
                <img src="imgs/ground.png" class="ground" data-ground>
                <img src="imgs/ground.png" class="ground" data-ground>
                <img src="imgs/men0.png" class="dino" data-dino>
            </div>   
        </div>
        
        <div class="contentbody" style="padding-bottom:3cm;">
            <a class="title">ALL-TIME REWARDS</a>
            <div class="container">
                    <div class="menu">
                        <div class="menuframe">
                            <img src="/image/dessert/6.JPG" class="menuimage">
                            <a class="menuname">Glass Jelly</a>
                            <a class="menuprice">500pts</a>
                        </div>
                        <div class="menuframe">
                            <img src="/image/dessert/9.JPG" class="menuimage">
                            <a class="menuname">Glass Jelly</a>
                            <a class="menuprice">500pts</a>
                        </div>
                        <div class="menuframe">
                            <img src="/image/dessert/2.JPG" class="menuimage">
                            <a class="menuname">Glass Jelly</a>
                            <a class="menuprice">500pts</a>
                        </div>
                    </div>
                </div>
        </div>

        <!--footer-->
        <div class="footer">
            <div class="Fcont">
                <div class="Fcontact">
                    <p>Contact Us</p>
                    <p>+60 17 - 506 0850</p><br>
                    <p>Contact Us (Developers)</p>
                    <p>+60 11 - 166 9995 4</p>
                    <p>+60 10 - 406 3398</p>
                    <br>
                    <p>Email (Developers)</p>
                    <p>justinphong2@gmail.com</p>
                    <p>lee@gmail.com</p>
                </div>
                <div class="conbutton">
                    <div class="Frectangle" onclick="window.location.href='/order.php'">
                        <p>Order Now</p>
                    </div>
                    <div class="Frectangle1" onclick="window.location.href='weixin://dl/chat?S13798246'">
                        <img src="/image/wechat.png" class="Ficon"><p class="FBT">Wechat</p>
                    </div>
                    <div class="Frectangle2" onclick="window.location.href='https://t.me/+GZrY4rbGtQ1kNzk1'">
                        <img src="/image/telegram.png" class="Ficon"><p class="FBT">Telegram</p>
                    </div>
                    <div class="copyright">© Lee and Phong Copyright 2024</div>
                </div>
                <div class="Fmap">
                    <img src="/image/map.png" class="Fmapi" onclick="window.location.href='https://maps.app.goo.gl/xNfV9CApXb4VZnvW9'">
                    <p class="FmapT">Cafe Inasis TNB @ UUM</p>
                </div>
            </div>
        </div>
    </body>
</html>
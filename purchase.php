<!DOCTYPE html>
<html lang="en">
<html>
    <header>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="purchase.css">
        <title>Yummy Fresh Online</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Jomhuria&display=swap" rel="stylesheet">
    </header>

    <body style="overflow-x:scroll">

        <!--small man-->
        <div class="manCont">
        <div class="manCon">
            <div class="manX">
                <img src="/image/X.png" class="manX">
            </div>
                <div class="man">
                    <img src="/image/man.gif" class="man">
                </div>
            </div>
        </div>

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

        <!--content-->
        <div class="container">
            <div class="consize">
                <div class="leftcon">
                    <img src="/image/account.png" class="accimg">
                    <a href="/account.php">
                        <div class="buttonbar">
                            <img src="/image/accountbutton.png" class="buttonimg">
                            <a class="leftbutton" href="/account.php">My Profile</a>
                        </div>
                    </a>
                    <a href="/purchase.php">
                    <div class="buttonbar">
                        <img src="/image/purchasebutton.png" class="buttonimg">
                        <a class="leftbutton" href="/purchase.php">My Purchase</a>
                    </div>
                    </a>
                    <a href="logout">
                        <div class="buttonbar">
                            <img src="/image/logoutbutton.png" class="buttonimg">
                            <a class="leftbutton" href="logout.php">Logout</a>
                        </div>
                    </a>
                </div>
            </div>
            <div class="rightcon">
                <a class="txt">My Purchase</a>
                <div class="card" style="font-family:Inter">
                    <div style="margin: 20px 30px;">
                        <a style="font-weight:bold;">01Jan2024</a>
                        <div style="display:flex;justify-content:space-between;margin:10px 0px 20px;" class="txtfont">
                            <a>12:00 am</a>
                            <div class="ref-container">
                                <a>ref:<a>
                                <a>002<a>
                            </div>
                        </div>
                        <div style="display:flex;justify-content:space-between;">
                            <img src="/image/maindishes/1.JPG" class="menuimage">
                            <div style="display: flex;flex-direction:column;flex:1;margin-left:20px">
                                <a class="txtfont">Curry Noodle</a>
                                <div class="txtfont">
                                    <a>x</a>
                                    <a>1</a>
                                </div>
                            </div>
                            <div class="txtfont">
                                <a style="font-weight:bold">RM</a>
                                <a style="font-weight:bold">6.00</a>
                            </div>
                        </div>
                    </div>
                    <div class="calculate">
                        <div style="flex-direction:column;" class="txtfont">
                            <div class="line"></div>
                            <div style="display: flex; justify-content: space-between;margin-bottom:20px">
                                <a style="margin-right:40px">Subtotal</a>
                                <a>RM 6.00</a>
                            </div>
                            <div style="display: flex; justify-content: space-between;margin-bottom:20px">
                                <a style="margin-right:40px">Discount</a>
                                <a>RM 0.00</a>
                            </div>
                            <div class="line"></div>
                            <div style="display: flex; justify-content: space-between;margin-bottom:20px">
                                <a style="margin-right:40px">Total</a>
                                <a>RM 6.00</a>
                            </div>
                        </div>
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
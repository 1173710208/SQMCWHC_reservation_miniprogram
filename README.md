<a name="readme-top"></a>


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/1173710208/SQMCWHC_reservation_miniprogram">
    <img src="miniprogram/images/QR.jpg" alt="QR Code" width="30%" height="30%">
  </a>

  <h3 align="center">SQMCWHC Appointment Wechat Mini Program</h3>

  <p align="center">
    Scan the QR code with WeChat app to view demo!
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

This is a WeChat mini-program for patients in Shangqiu Maternal and Child Welfare Health Center (SQMCWHC) to book check-ups and physiotherapy.

### Built With

* <a href="https://developers.weixin.qq.com/miniprogram/en/dev/framework/">Wechat Mini Program</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

This section shows how you may set up this project locally.
To get a local copy up and running follow these simple steps.

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Go to the [Mini Program Registration page](https://mp.weixin.qq.com/wxopen/waregister?action=step1&source=mpregister&token=&lang=zh_CN), and enter and submit the required information as instructed to get your Mini Program account.
2. Log in to [Mini Program Console](https://mp.weixin.qq.com/), go to **Settings** > **Development** **Settings** to find the **AppID** of the Mini Program.
3. Go to the [Weixin DevTools download page](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html) to download the installer package based on your OS. For more information on Weixin DevTools, see [Introduction to Weixin DevTools](https://developers.weixin.qq.com/miniprogram/en/dev/devtools/devtools.html). Log in to the Weixin DevTools by scanning the QR code with Weixin.

4. Go to **Other** > **Import**  to import this project.
   ![image](https://github.com/1173710208/SQMCWHC_reservation_miniprogram/assets/47967213/d822fa5d-230e-4590-9daa-2b4f082015bc)

5. Go to Cloud Base to open WeChat Cloud Development Service and get the **environment id**. For more information on Weixin Cloud, see [Introduction to Weixin Cloud](https://developers.weixin.qq.com/miniprogram/en/dev/wxcloud/basis/getting-started.html).
   ![image](https://github.com/1173710208/SQMCWHC_reservation_miniprogram/assets/47967213/01231a85-d88d-4c67-b8b6-3de584f0609e)

6. Enter your **environment id** in `app.js` (line 13)
   ```js
        env: 'your-environment-id'
   ```
7. Create three collections named 'gongxun', 'qiangci' and 'holiday' in the cloud database.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Zhi Zeng - zengzhi999hhh@gmail.com

Project Link: [https://github.com/1173710208/SQMCWHC_reservation_miniprogram](https://github.com/1173710208/SQMCWHC_reservation_miniprogram)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Weixin Docs](https://developers.weixin.qq.com/miniprogram/en/dev/framework/)
* [Weinxin Cloud](https://developers.weixin.qq.com/miniprogram/en/dev/wxcloud/basis/getting-started.html)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

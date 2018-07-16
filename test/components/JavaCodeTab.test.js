const commonInputs = require('./../helpers/commonInputs');
const regeneratorRuntime = require("regenerator-runtime");
const puppeteer = require('puppeteer');

let browser, page;

beforeAll(async () => {

    browser = await puppeteer.launch({
        headless: true,
    });
    page = await browser.newPage();

}, 30000);

beforeEach(async () => {
    await page.goto('http://localhost:9000/');
}, 30000);

test('JavaCodeTab should render on load', async () => {

    const codeSnippet = await commonInputs.getCodeSnippet(page, 'java');
    expect(codeSnippet).toBe(`import java.io.DataOutputStream;import java.io.BufferedReader;import java.io.InputStreamReader;import java.net.URL;import java.net.HttpURLConnection;​public class Main {  public static void main(String[] args) {    try {      URL url = new URL("");      HttpURLConnection connection = (HttpURLConnection) url.openConnection();      connection.setRequestMethod("GET");      BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));      String inputLine;      StringBuffer response = new StringBuffer();      while ((inputLine = in.readLine()) != null) {        response.append(inputLine);      }      in.close();      System.out.println(response.toString());    } catch (Exception e) {      // TODO: handle exception    }  }}`);
    
}, 30000);

test('JavaCodeTab should render GET request code', async () => {

    await commonInputs.enterSampleGETRequestInput(page);
    let codeSnippet = await commonInputs.getCodeSnippet(page, 'java');
    expect(codeSnippet).toBe(`import java.io.DataOutputStream;import java.io.BufferedReader;import java.io.InputStreamReader;import java.net.URL;import java.net.HttpURLConnection;​public class Main {  public static void main(String[] args) {    try {      URL url = new URL("https://jsonplaceholder.typicode.com/posts/1");      HttpURLConnection connection = (HttpURLConnection) url.openConnection();      connection.setRequestMethod("GET");      connection.setRequestProperty("Accept", "application/json");      BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));      String inputLine;      StringBuffer response = new StringBuffer();      while ((inputLine = in.readLine()) != null) {        response.append(inputLine);      }      in.close();      System.out.println(response.toString());    } catch (Exception e) {      // TODO: handle exception    }  }}`);

}, 30000);

test('JavaCodeTab should render POST request code', async () => {

    await commonInputs.enterSamplePOSTRequestInput(page);
    let codeSnippet = await commonInputs.getCodeSnippet(page, 'java');
    expect(codeSnippet).toBe(`import java.io.DataOutputStream;import java.io.BufferedReader;import java.io.InputStreamReader;import java.net.URL;import java.net.HttpURLConnection;​public class Main {  public static void main(String[] args) {    try {      URL url = new URL("https://jsonplaceholder.typicode.com/posts");      HttpURLConnection connection = (HttpURLConnection) url.openConnection();      connection.setRequestMethod("POST");      connection.setRequestProperty("Accept", "application/json");      String requestBody = "{\\\"title\\\":\\\"foo\\\",\\\"body\\\":\\\"bar\\\",\\\"userId\\\":1}";      connection.setDoOutput(true);      DataOutputStream wr = new DataOutputStream(connection.getOutputStream());      wr.writeBytes(requestBody);      wr.flush();      wr.close();      BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));      String inputLine;      StringBuffer response = new StringBuffer();      while ((inputLine = in.readLine()) != null) {        response.append(inputLine);      }      in.close();      System.out.println(response.toString());    } catch (Exception e) {      // TODO: handle exception`);

}, 30000);

afterAll(() => {
    browser.close();
});

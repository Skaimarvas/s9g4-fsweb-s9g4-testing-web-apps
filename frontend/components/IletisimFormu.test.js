import React from "react";
import {
  fireEvent,
  getByRole,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import IletisimFormu from "./IletisimFormu";
import Goruntule from "./Goruntule";

test("hata olmadan render ediliyor", () => {
  render(<IletisimFormu />);
});

test("iletişim formu headerı render ediliyor", () => {
  render(<IletisimFormu />);
  const h1element = screen.getByRole("heading", { level: 1 });
  // h "başlık" tagleri için "heading" yazmak önemli
  expect(h1element).toBeInTheDocument();
  screen.debug(h1element);
});

test("kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.", async () => {
  render(<IletisimFormu />);

  await waitFor(() => {
    const username = screen.getByTestId("name");
    userEvent.type(username, "İlh");
  });

  const hata = screen.getByTestId("error");
  expect(hata).toHaveTextContent("ad en az 5 karakter olmalıdır.");
  screen.debug(hata);
});

test("kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);

  const gonder = screen.getByTestId("submit");
  const hata1 = screen.queryByTestId("error");
  expect(hata1).not.toBeInTheDocument();
  //butona basmadan önce hata mesajı olup olmadığını kontrol ediyoruz.
  await waitFor(() => {
    userEvent.click(gonder);
  });

  const hatalar = screen.getAllByTestId("error");

  const expectingError = [
    "ad en az 5 karakter olmalıdır",
    "soyad gereklidir",
    "email geçerli bir email adresi olmalıdır.",
  ];

  //hata mesajlarını bir dizi içerisine aktardık

  hatalar.forEach((hata, index) =>
    expect(hata.textContent).toContain(expectingError[index])
  );

  //forEach methodu ile hataları içerip içermediğini kontrol ettik
});

test("kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);
  const username = screen.getByTestId("name");
  userEvent.type(username, "İlhan");
  const usersurname = screen.getByTestId("surname");
  userEvent.type(usersurname, "Mansız");

  const gonder = screen.getByTestId("submit");
  const hata1 = screen.queryByTestId("error");
  expect(hata1).not.toBeInTheDocument();
  //butona basmadan önce hata mesajı olup olmadığını kontrol ediyoruz.
  await waitFor(() => {
    userEvent.click(gonder);
  });

  const hata = screen.getByTestId("error");
  expect(hata).toHaveTextContent("email geçerli bir email adresi olmalıdır.");
  screen.debug(hata);
});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
  render(<IletisimFormu />);

  await waitFor(() => {
    const email = screen.getByTestId("email");
    userEvent.type(email, "asd");
  });

  const hata = screen.getByTestId("error");
  expect(hata).toHaveTextContent("email geçerli bir email adresi olmalıdır");
  screen.debug(hata);
});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
  render(<IletisimFormu />);
  const username = screen.getByTestId("name");
  userEvent.type(username, "İlhan");
  const useremail = screen.getByTestId("email");
  userEvent.type(useremail, "abc@abc.com");

  const gonder = screen.getByTestId("submit");
  const hata1 = screen.queryByTestId("error");
  expect(hata1).not.toBeInTheDocument();
  //butona basmadan önce hata mesajı olup olmadığını kontrol ediyoruz.
  await waitFor(() => {
    userEvent.click(gonder);
  });

  const hata = screen.getByTestId("error");
  expect(hata).toHaveTextContent("soyad gereklidir.");
  screen.debug(hata);
});

test("ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.", async () => {
  render(<IletisimFormu />);
  const username = screen.getByTestId("name");
  userEvent.type(username, "İlhan");
  const usersurname = screen.getByTestId("surname");
  userEvent.type(usersurname, "Mansız");
  const useremail = screen.getByTestId("email");
  userEvent.type(useremail, "abc@abc.com");

  const gonder = screen.getByTestId("submit");
  await waitFor(() => {
    userEvent.click(gonder);
  });

  const hata = screen.queryByTestId("error");
  expect(hata).not.toBeInTheDocument();

  screen.debug(hata);
});

test("form gönderildiğinde girilen tüm değerler render ediliyor.", async () => {
  render(<IletisimFormu />);
  const username = screen.getByTestId("name");
  userEvent.type(username, "İlhan");
  const usersurname = screen.getByTestId("surname");
  userEvent.type(usersurname, "Mansız");
  const useremail = screen.getByTestId("email");
  userEvent.type(useremail, "abc@abc.com");
  const message = screen.getByTestId("mesaj");
  userEvent.type(message, "deneme");

  const gonder = screen.getByTestId("submit");
  await waitFor(() => {
    userEvent.click(gonder);
  });

  const firstname = screen.getByTestId("firstnameDisplay");
  expect(firstname).toHaveTextContent("İlhan");
  const lastname = screen.getByTestId("lastnameDisplay");
  expect(lastname).toHaveTextContent("Mansız");
  const email = screen.getByTestId("emailDisplay");
  expect(email).toHaveTextContent("abc@abc.com");
  const messageD = screen.getByTestId("messageDisplay");
  expect(messageD).toHaveTextContent("deneme");
});

// await waitFor işlemini genellike gönder butonuna ekledim. Çünkü asenkron işlem gerçekleştiriyor. Gönder işlemini yapmadan test işlemlerinde hata çıkmasına neden olabilir.

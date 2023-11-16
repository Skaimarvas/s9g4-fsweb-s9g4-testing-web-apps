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
  const username = screen.getByTestId("name");
  userEvent.type(username, "İlh");
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

test("kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.", async () => {});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {});

test("ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.", async () => {});

test("form gönderildiğinde girilen tüm değerler render ediliyor.", async () => {});

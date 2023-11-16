import React from "react";
import { getByRole, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import IletisimFormu from "./IletisimFormu";

const mainRender = render(<IletisimFormu />);

test("hata olmadan render ediliyor", () => {
  mainRender;
});

test("iletişim formu headerı render ediliyor", () => {
  render(<IletisimFormu />);
  const h1element = screen.getByRole("heading", { level: 1 });
  // h "başlık" tagleri için "heading" yazmak önemli
  expect(h1element).toBeInTheDocument();
  screen.debug(h1element);
});

test("kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.", async () => {});

test("kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.", async () => {});

test("kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.", async () => {});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {});

test("ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.", async () => {});

test("form gönderildiğinde girilen tüm değerler render ediliyor.", async () => {});

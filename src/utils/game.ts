import b1 from "@/assets/audio/B1.mp3";
import b10 from "@/assets/audio/B10.mp3";
import b11 from "@/assets/audio/B11.mp3";
import b12 from "@/assets/audio/B12.mp3";
import b13 from "@/assets/audio/B13.mp3";
import b14 from "@/assets/audio/B14.mp3";
import b15 from "@/assets/audio/B15.mp3";
import b2 from "@/assets/audio/B2.mp3";
import b3 from "@/assets/audio/B3.mp3";
import b4 from "@/assets/audio/B4.mp3";
import b5 from "@/assets/audio/B5.mp3";
import b6 from "@/assets/audio/B6.mp3";
import b7 from "@/assets/audio/B7.mp3";
import b8 from "@/assets/audio/B8.mp3";
import b9 from "@/assets/audio/B9.mp3";
import g46 from "@/assets/audio/G46.mp3";
import g47 from "@/assets/audio/G47.mp3";
import g48 from "@/assets/audio/G48.mp3";
import g49 from "@/assets/audio/G49.mp3";
import g50 from "@/assets/audio/G50.mp3";
import g51 from "@/assets/audio/G51.mp3";
import g52 from "@/assets/audio/G52.mp3";
import g53 from "@/assets/audio/G53.mp3";
import g54 from "@/assets/audio/G54.mp3";
import g55 from "@/assets/audio/G55.mp3";
import g56 from "@/assets/audio/G56.mp3";
import g57 from "@/assets/audio/G57.mp3";
import g58 from "@/assets/audio/G58.mp3";
import g59 from "@/assets/audio/G59.mp3";
import g60 from "@/assets/audio/G60.mp3";
import i16 from "@/assets/audio/I16.mp3";
import i17 from "@/assets/audio/I17.mp3";
import i18 from "@/assets/audio/I18.mp3";
import i19 from "@/assets/audio/I19.mp3";
import i20 from "@/assets/audio/I20.mp3";
import i21 from "@/assets/audio/I21.mp3";
import i22 from "@/assets/audio/I22.mp3";
import i23 from "@/assets/audio/I23.mp3";
import i24 from "@/assets/audio/I24.mp3";
import i25 from "@/assets/audio/I25.mp3";
import i26 from "@/assets/audio/I26.mp3";
import i27 from "@/assets/audio/I27.mp3";
import i28 from "@/assets/audio/I28.mp3";
import i29 from "@/assets/audio/I29.mp3";
import i30 from "@/assets/audio/I30.mp3";
import n31 from "@/assets/audio/N31.mp3";
import n32 from "@/assets/audio/N32.mp3";
import n33 from "@/assets/audio/N33.mp3";
import n34 from "@/assets/audio/N34.mp3";
import n35 from "@/assets/audio/N35.mp3";
import n36 from "@/assets/audio/N36.mp3";
import n37 from "@/assets/audio/N37.mp3";
import n38 from "@/assets/audio/N38.mp3";
import n39 from "@/assets/audio/N39.mp3";
import n40 from "@/assets/audio/N40.mp3";
import n41 from "@/assets/audio/N41.mp3";
import n42 from "@/assets/audio/N42.mp3";
import n43 from "@/assets/audio/N43.mp3";
import n44 from "@/assets/audio/N44.mp3";
import n45 from "@/assets/audio/N45.mp3";
import o61 from "@/assets/audio/O61.mp3";
import o62 from "@/assets/audio/O62.mp3";
import o63 from "@/assets/audio/O63.mp3";
import o64 from "@/assets/audio/O64.mp3";
import o65 from "@/assets/audio/O65.mp3";
import o66 from "@/assets/audio/O66.mp3";
import o67 from "@/assets/audio/O67.mp3";
import o68 from "@/assets/audio/O68.mp3";
import o69 from "@/assets/audio/O69.mp3";
import o70 from "@/assets/audio/O70.mp3";
import o71 from "@/assets/audio/O71.mp3";
import o72 from "@/assets/audio/O72.mp3";
import o73 from "@/assets/audio/O73.mp3";
import o74 from "@/assets/audio/O74.mp3";
import o75 from "@/assets/audio/O75.mp3";

export function getBingoLetter(number: number): string {
  const letters = ["b", "i", "n", "g", "o"];
  if (number < 1 || number > 75) {
    // Número fuera de rango
    return "";
  }
  return letters[Math.floor((number - 1) / 15)];
}

const getLetterForNumber = (num: number) => {
  if (num <= 15) return "B";
  if (num <= 30) return "I";
  if (num <= 45) return "N";
  if (num <= 60) return "G";
  return "O";
};

export const organizeNumbers = () => {
  const allNumbers = Array.from({ length: 75 }, (_, i) => i + 1);
  return allNumbers.reduce((acc, num) => {
    const letter = getLetterForNumber(num);
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(num);
    return acc;
  }, {} as Record<string, number[]>);
};

export const dateFormatter = (date: Date) => {
  return new Intl.DateTimeFormat("es-CO", {
    timeZone: "UTC", // Zona horaria de Colombia
    weekday: "long", // Día de la semana completo (ej. "lunes")
    year: "numeric", // Año con cuatro dígitos
    month: "long", // Mes completo (ej. "septiembre")
    day: "2-digit", // Día del mes (ej. "6")
  }).format(date);
};

// browser API
const areNotificationsSupported = () => "Notification" in window;

export const requestNotificationPermission = async () => {
  if (!areNotificationsSupported()) {
    console.log("this browser does not support notifications");
    return false;
  }
  const permission = await Notification.requestPermission();
  return permission === "granted";
};

export const sendNotification = (title: string, options?: NotificationOptions) => {
  if (!areNotificationsSupported()) {
    console.log("this browser does not support notifications");
    return;
  }
  if (Notification.permission !== "granted") {
    console.log("notifications permission not granted");
    return;
  }

  new Notification(title, options);
};

export function capitalizeWords(str: string) {
  return str
    .split(" ")
    .reduce((acc, word) => {
      return acc + " " + word.charAt(0).toUpperCase() + word.slice(1);
    }, "")
    .trim();
}

export const audioNumbers: { [key: number]: () => Promise<void> } = {
  1: () => new Audio(b1).play(),
  2: () => new Audio(b2).play(),
  3: () => new Audio(b3).play(),
  4: () => new Audio(b4).play(),
  5: () => new Audio(b5).play(),
  6: () => new Audio(b6).play(),
  7: () => new Audio(b7).play(),
  8: () => new Audio(b8).play(),
  9: () => new Audio(b9).play(),
  10: () => new Audio(b10).play(),
  11: () => new Audio(b11).play(),
  12: () => new Audio(b12).play(),
  13: () => new Audio(b13).play(),
  14: () => new Audio(b14).play(),
  15: () => new Audio(b15).play(),
  16: () => new Audio(i16).play(),
  17: () => new Audio(i17).play(),
  18: () => new Audio(i18).play(),
  19: () => new Audio(i19).play(),
  20: () => new Audio(i20).play(),
  21: () => new Audio(i21).play(),
  22: () => new Audio(i22).play(),
  23: () => new Audio(i23).play(),
  24: () => new Audio(i24).play(),
  25: () => new Audio(i25).play(),
  26: () => new Audio(i26).play(),
  27: () => new Audio(i27).play(),
  28: () => new Audio(i28).play(),
  29: () => new Audio(i29).play(),
  30: () => new Audio(i30).play(),
  31: () => new Audio(n31).play(),
  32: () => new Audio(n32).play(),
  33: () => new Audio(n33).play(),
  34: () => new Audio(n34).play(),
  35: () => new Audio(n35).play(),
  36: () => new Audio(n36).play(),
  37: () => new Audio(n37).play(),
  38: () => new Audio(n38).play(),
  39: () => new Audio(n39).play(),
  40: () => new Audio(n40).play(),
  41: () => new Audio(n41).play(),
  42: () => new Audio(n42).play(),
  43: () => new Audio(n43).play(),
  44: () => new Audio(n44).play(),
  45: () => new Audio(n45).play(),
  46: () => new Audio(g46).play(),
  47: () => new Audio(g47).play(),
  48: () => new Audio(g48).play(),
  49: () => new Audio(g49).play(),
  50: () => new Audio(g50).play(),
  51: () => new Audio(g51).play(),
  52: () => new Audio(g52).play(),
  53: () => new Audio(g53).play(),
  54: () => new Audio(g54).play(),
  55: () => new Audio(g55).play(),
  56: () => new Audio(g56).play(),
  57: () => new Audio(g57).play(),
  58: () => new Audio(g58).play(),
  59: () => new Audio(g59).play(),
  60: () => new Audio(g60).play(),
  61: () => new Audio(o61).play(),
  62: () => new Audio(o62).play(),
  63: () => new Audio(o63).play(),
  64: () => new Audio(o64).play(),
  65: () => new Audio(o65).play(),
  66: () => new Audio(o66).play(),
  67: () => new Audio(o67).play(),
  68: () => new Audio(o68).play(),
  69: () => new Audio(o69).play(),
  70: () => new Audio(o70).play(),
  71: () => new Audio(o71).play(),
  72: () => new Audio(o72).play(),
  73: () => new Audio(o73).play(),
  74: () => new Audio(o74).play(),
  75: () => new Audio(o75).play(),
};

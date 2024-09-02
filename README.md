
# DABubble - Chat Messenger App für Business Teams

## Inhaltsverzeichnis
1. [Über das Projekt](#über-das-projekt)
2. [Features](#features)
3. [Technologien](#technologien)
4. [Installation](#installation)
5. [Nutzung](#nutzung)
6. [Screenshots](#screenshots)
7. [Mitwirken](#mitwirken)
8. [Lizenz](#lizenz)

## Update: Refactoring in Progress

Ich arbeite derzeit an einem umfassenden Refactoring des Projekts, um die Wartbarkeit und Performance der Anwendung zu verbessern. Dabei konzentriere ich mich auf folgende Aspekte:

- **Neumodellierung der Datenbank:** Die Datenbankstruktur wird überarbeitet, um die Datenverwaltung zu optimieren und zukünftige Erweiterungen zu erleichtern.
- **Moderne Angular-Practices:** Ich setze moderne Best Practices in Angular um, um den Code sauberer und wartbarer zu gestalten.
- **Leistungsverbesserung mit Angular Signals:** Zur Verbesserung der Performance wird Angular Signals integriert, was eine effizientere Verwaltung von Zustandsänderungen ermöglicht.

Das Refactoring ist noch nicht vollständig abgeschlossen. Für Interessierte oder potenzielle Arbeitgeber, die den bisherigen Stand des Projekts sehen möchten, ist das ursprüngliche Projekt [hier auf GitHub](https://github.com/tobiasroeske/DA_Bubble) verfügbar.

**Hinweis:** Sobald das Refactoring abgeschlossen ist, werde ich die ReadMe-Datei entsprechend aktualisieren und den neuen Code bereitstellen.



## Über das Projekt

Diese Chat Messenger App wurde entwickelt, um die Kommunikation in Business Teams zu erleichtern. Sie ermöglicht es Benutzern, sich per E-Mail oder Google-Login anzumelden, Kanäle zu erstellen und in Echtzeit mit Teammitgliedern zu chatten. Die App wurde mit Angular für das Frontend und Google Firebase für das Backend entwickelt, um eine nahtlose und schnelle Benutzererfahrung zu gewährleisten.

## Features

- **Benutzeranmeldung:** Einfache Registrierung und Login über E-Mail oder Google-Login.
- **Kanäle:** Erstellen von neuen Chat-Kanälen für Team- und Projektkommunikation.
- **Direktnachrichten:** Senden von privaten Nachrichten an andere Teammitglieder für direkte Kommunikation.
- **Tagging und Benachrichtigungen:** Erwähne Teammitglieder in Nachrichten durch Tagging (@Nutzername), damit sie sofort benachrichtigt werden.
- **Threads:** Antworte auf Nachrichten entweder direkt im Kanal oder starte einen Thread für fokussierte Diskussionen.
- **Echtzeit-Kommunikation:** Nachrichten werden in Echtzeit gesendet und empfangen, sodass du immer auf dem neuesten Stand bleibst.
- **Benutzerfreundliche Oberfläche:** Intuitive und moderne Benutzeroberfläche, die eine einfache Navigation und Nutzung ermöglicht.
- **Sicher:** Nutzung von Firebase Authentication für sichere Anmeldungen und Firebase Firestore für die Speicherung von Nachrichten.

## Technologien

- **Frontend:** Angular
- **Backend:** Google Firebase (Firestore, Authentication)
- **Programmiersprachen:** TypeScript, HTML, CSS
- **Weitere Tools:** Angular Material für UI-Komponenten, RxJS für reaktive Programmierung

## Installation

Um die App lokal zu installieren und zu starten, folge diesen Schritten:

1. **Repository klonen:**
   ```bash
   git clone https://github.com/dein-benutzername/chat-messenger-app.git
   ```
   
2. **In das Projektverzeichnis wechseln:**
   ```bash
   cd chat-messenger-app
   ```

3. **Abhängigkeiten installieren:**
   ```bash
   npm install
   ```

4. **Umgebungskonfiguration:**
   - Erstelle eine `firebase.ts` Datei im environments-Verzeichnis.
   - Füge deine Firebase-Konfiguration hinzu:
     ```bash
     FIREBASE_API_KEY=dein_api_key
     FIREBASE_AUTH_DOMAIN=dein_auth_domain
     FIREBASE_PROJECT_ID=dein_project_id
     FIREBASE_STORAGE_BUCKET=dein_storage_bucket
     FIREBASE_MESSAGING_SENDER_ID=dein_messaging_sender_id
     FIREBASE_APP_ID=dein_app_id
     ```

5. **App starten:**
   ```bash
   ng serve
   ```
   
   Die App läuft nun unter `http://localhost:4200/`.

## Nutzung

1. Registriere dich mit einer E-Mail-Adresse oder melde dich mit deinem Google-Account an.
2. Erstelle neue Kanäle für verschiedene Themen oder Teams.
3. Starte die Kommunikation in Echtzeit mit deinen Teammitgliedern.

## Mitwirken

Beiträge zur Verbesserung der App sind willkommen! Wenn du mitwirken möchtest:

1. Forke das Repository.
2. Erstelle einen neuen Branch (`git checkout -b feature/neues-feature`).
3. Führe deine Änderungen durch und committe sie (`git commit -m 'Feature hinzugefügt'`).
4. Push den Branch (`git push origin feature/neues-feature`).
5. Erstelle eine Pull-Request.

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert – siehe die [LICENSE](LICENSE) Datei für Details.

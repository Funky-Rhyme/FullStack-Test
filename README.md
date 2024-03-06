# Instruction
---
## 1. Install database:
	- Install docker (if not installed) and open terminal
	- Intall MS SQL Server:
```
docker pull mcr.microsoft.com/mssql/server
```
	- Run MS SQL Server:
```
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=yourStrong(!)Password" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest --name MSSQL
```

> [!NOTE]
> MSSQL_SA_PASSWORD here is a standard password in official MS SQL image documentation. You can type your own password but you have to change config file of api.
> 

## 2. Get api ready:
	- Open terminal in api folder
	- Run `dotnet build` and then `dotnet run`

## 3. Get frontend ready:
	- Open terminal in frontend folder
	- Run `npm install` and then `npm run dev`

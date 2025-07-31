import fs from "fs";
import path from "path";
import xlsx from "xlsx";
import Task from "../models/Task.js";
import User from "../models/User.js";

export const uploadAndDistribute = async (req, res) => {
  try {
    const filePath = req.file.path;
    const ext = path.extname(filePath);

    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet);

    const validRows = rows.filter((row) => row.FirstName && row.Phone);

    if (validRows.length === 0) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ message: "No valid rows found" });
    }

    const agents = await User.find({ role: "agent" });

    if (agents.length < 1) {
      return res.status(400).json({ message: "No agents available" });
    }

    const tasks = [];
    validRows.forEach((row, index) => {
      const agentIndex = index % agents.length;
      const assignedTo = agents[agentIndex]._id;

      tasks.push({
        firstName: row.FirstName,
        phone: row.Phone.toString(),
        notes: row.Notes || "",
        assignedTo,
      });
    });

    await Task.insertMany(tasks);
    fs.unlinkSync(filePath);

    res.status(200).json({ message: "Tasks distributed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

export const getAgentTasks = async (req, res) => {
  const { agentId } = req.params;
  try {
    const tasks = await Task.find({ assignedTo: agentId });
    res.json(tasks);
  } catch {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

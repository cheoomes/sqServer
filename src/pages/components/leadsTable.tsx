"use client";

import { useState } from "react";

type Lead = {
    id: number;
    name: string;
    email: string;
    phone?: string;
    location: string;
    quote: number;
    energyConsumption: number;
    bill?: number;
    createdAt: string;
};

interface LeadsTableProps {
    leads: Lead[];
}

export default function LeadsTable({ leads }: LeadsTableProps) {
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState<keyof Lead>("createdAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const filteredLeads = [...leads]
        .filter((lead) =>
            Object.values(lead)
                .join(" ")
                .toLowerCase()
                .includes(search.toLowerCase())
        )
        .sort((a, b) => {
            const valA = a[sortField];
            const valB = b[sortField];

            // Convert to string for comparison safety
            const strA = String(valA ?? "");
            const strB = String(valB ?? "");

            if (strA < strB) return sortOrder === "asc" ? -1 : 1;
            if (strA > strB) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });

    function handleSort(field: keyof Lead) {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    }

    return (
        <div style={{ marginTop: "20px" }}>
            {/* Search bar */}
            <input
                type="text"
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    marginBottom: "10px",
                    padding: "5px",
                    width: "300px",
                }}
            />

            {/* Table */}
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "10px",
                }}
            >
                <thead>
                    <tr>
                        <th onClick={() => handleSort("name")}>Name</th>
                        <th onClick={() => handleSort("email")}>Email</th>
                        <th onClick={() => handleSort("phone")}>Phone</th>
                        <th onClick={() => handleSort("location")}>Location</th>
                        <th onClick={() => handleSort("quote")}>Quote</th>
                        <th onClick={() => handleSort("energyConsumption")}>
                            Energy
                        </th>
                        <th onClick={() => handleSort("bill")}>Bill</th>
                        <th onClick={() => handleSort("createdAt")}>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLeads.map((lead) => (
                        <tr key={lead.id}>
                            <td>{lead.name}</td>
                            <td>{lead.email}</td>
                            <td>{lead.phone ?? "-"}</td>
                            <td>{lead.location}</td>
                            <td>{lead.quote}</td>
                            <td>{lead.energyConsumption}</td>
                            <td>{lead.bill ?? "-"}</td>
                            <td>
                                {new Date(lead.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

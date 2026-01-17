"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CouponManagement() {
  const [coupons, setCoupons] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({});
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin");
      return;
    }

    loadCoupons();
  }, [currentPage, filter, search, router]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("admin_token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  const loadCoupons = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "20",
        ...(filter !== "all" && { status: filter }),
        ...(search && { search }),
      });

      const response = await fetch(`/api/admin/coupons?${params}`, {
        headers: getAuthHeaders(),
      });

      const result = await response.json();

      if (result.success) {
        setCoupons(result.coupons);
        setStats(result.stats);
        setPagination(result.pagination);
      } else {
        if (response.status === 401) {
          localStorage.removeItem("admin_token");
          localStorage.removeItem("admin_user");
          router.push("/admin");
          return;
        }
        setError(result.message);
      }
    } catch (error) {
      setError("Failed to load coupons");
      console.error("Load coupons error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCoupon = async (couponData) => {
    try {
      const response = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(couponData),
      });

      const result = await response.json();

      if (result.success) {
        setShowCreateModal(false);
        loadCoupons();
        setError("");
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("Failed to create coupon");
      console.error("Create coupon error:", error);
    }
  };

  const handleUpdateCoupon = async (couponData) => {
    try {
      const response = await fetch("/api/admin/coupons", {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(couponData),
      });

      const result = await response.json();

      if (result.success) {
        setEditingCoupon(null);
        loadCoupons();
        setError("");
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("Failed to update coupon");
      console.error("Update coupon error:", error);
    }
  };

  const handleDeleteCoupon = async (couponId, coupon) => {
    const message =
      coupon.usedCount > 0
        ? `This coupon "${coupon.code}" has been used ${coupon.usedCount} time(s). You cannot delete it. Consider disabling it instead.`
        : `Are you sure you want to delete coupon "${coupon.code}"?`;

    if (!confirm(message)) {
      return;
    }

    if (coupon.usedCount > 0) {
      // Just disable the coupon instead of deleting
      await handleUpdateCoupon({ ...coupon, isActive: false });
      return;
    }

    try {
      const response = await fetch(`/api/admin/coupons?id=${couponId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const result = await response.json();

      if (result.success) {
        loadCoupons();
        setError("");
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("Failed to delete coupon");
      console.error("Delete coupon error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    router.push("/admin");
  };

  const formatDate = (date) => {
    if (!date) return "Invalid Date";
    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  const getCouponStatus = (coupon) => {
    if (!coupon.isActive) return { label: "Inactive", color: "bg-gray-500" };
    if (coupon.usedCount >= coupon.usageLimit)
      return { label: "Exhausted", color: "bg-red-500" };
    return { label: "Active", color: "bg-green-500" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/20 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Coupon Management
              </h1>
              <p className="text-gray-300">Jisus AI Admin Dashboard</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Coupons</p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalCoupons || 0}
                </p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <div className="w-6 h-6 text-blue-400">🎫</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Active Coupons</p>
                <p className="text-2xl font-bold text-green-400">
                  {stats.activeCoupons || 0}
                </p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <div className="w-6 h-6 text-green-400">✅</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Usage</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {stats.totalUsage || 0}
                </p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <div className="w-6 h-6 text-yellow-400">📊</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Expired</p>
                <p className="text-2xl font-bold text-red-400">
                  {stats.expiredCoupons || 0}
                </p>
              </div>
              <div className="p-3 bg-red-500/20 rounded-lg">
                <div className="w-6 h-6 text-red-400">⏰</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/20 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-2 bg-white/10 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Coupons</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Search coupon code..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="px-4 py-2 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Create Coupon
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Coupons Table */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/20 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <p className="text-white mt-2">Loading coupons...</p>
            </div>
          ) : coupons.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-300">No coupons found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Plan Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Usage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {coupons.map((coupon) => {
                    const status = getCouponStatus(coupon);
                    return (
                      <tr key={coupon._id} className="hover:bg-white/5">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-mono font-medium text-white">
                              {coupon.code}
                            </div>
                            {coupon.description && (
                              <div className="text-xs text-gray-400">
                                {coupon.description}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${status.color}`}
                          >
                            {status.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {coupon.planType === "both"
                            ? "All Plans"
                            : coupon.planType === "daily_plan"
                              ? "Daily"
                              : "Monthly"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {coupon.usedCount} / {coupon.usageLimit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            onClick={() => setEditingCoupon(coupon)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteCoupon(coupon._id, coupon)
                            }
                            className="text-red-400 hover:text-red-300"
                          >
                            {coupon.usedCount > 0 ? "Disable" : "Delete"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-white/10 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-white">
                Page {currentPage} of {pagination.pages}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === pagination.pages}
                className="px-3 py-1 bg-white/10 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || editingCoupon) && (
        <CouponModal
          coupon={editingCoupon}
          onSave={editingCoupon ? handleUpdateCoupon : handleCreateCoupon}
          onCancel={() => {
            setShowCreateModal(false);
            setEditingCoupon(null);
          }}
        />
      )}
    </div>
  );
}

function CouponModal({ coupon, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    code: coupon?.code || "",
    planType: coupon?.planType || "daily_plan",
    usageLimit: coupon?.usageLimit || 1,
    description: coupon?.description || "",
    isActive: coupon?.isActive ?? true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");

    try {
      await onSave({
        ...(coupon && { _id: coupon._id }),
        ...formData,
      });
    } catch (error) {
      setFormError(error.message || "Failed to save coupon");
      console.error("Submit error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/20 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-white mb-6">
          {coupon ? "Edit Coupon" : "Create New Coupon"}
        </h2>

        {formError && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-300 text-sm">{formError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Coupon Code *
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value.toUpperCase() })
              }
              className="w-full px-3 py-2 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="AKARSH2026"
              required
              disabled={submitting}
              maxLength={20}
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Plan Type *
            </label>
            <select
              value={formData.planType}
              onChange={(e) =>
                setFormData({ ...formData, planType: e.target.value })
              }
              className="w-full px-3 py-2 bg-white/10 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={submitting}
            >
              <option value="daily_plan">Daily Plan (24 Hours)</option>
              <option value="monthly_plan">Monthly Plan (30 Days)</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Usage Limit *
            </label>
            <input
              type="number"
              value={formData.usageLimit}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  usageLimit: parseInt(e.target.value) || 1,
                })
              }
              className="w-full px-3 py-2 bg-white/10 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              required
              disabled={submitting}
            />
            <p className="text-gray-400 text-xs mt-1">
              How many users can use this coupon
            </p>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="2"
              placeholder="Welcome coupon for new users"
              disabled={submitting}
              maxLength={200}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              disabled={submitting}
            />
            <label htmlFor="isActive" className="ml-2 text-sm text-gray-300">
              Coupon is active
            </label>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {submitting
                ? "Saving..."
                : coupon
                  ? "Update Coupon"
                  : "Create Coupon"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={submitting}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
